/* eslint-disable no-undef */
const Setores = require('../../../src/infra/models/Setores')
const Colaborador = require('../../../src/infra/models/Colaboradores')
const Sequelize = require('sequelize')
const dbConfig = require('../../../src/main/config/db-config')

const RegisterUserRepository = require('../../../src/infra/repositories/register-user-repository')

const mockConfig = { ...dbConfig, host: 'localhost' }
const sequelize = new Sequelize(mockConfig)

Setores.init(sequelize)
Colaborador.init(sequelize)

const makeCpfValidator = () => {
  class CpfValidator {
    validate (cpf) {
      this.cpf = cpf
      return this.isValid
    }
  }
  const cpfValidator = new CpfValidator()
  cpfValidator.isValid = true
  return cpfValidator
}

const makeCpfValidatorWithError = () => {
  class CpfValidator {
    validate (cpf) {
      throw new Error('CPF not valid 400')
    }
  }
  return new CpfValidator()
}

const makeEmailValidator = () => {
  class EmailValidator {
    validate (email) {
      this.email = email
      return this.isValid
    }
  }
  const emailValidator = new EmailValidator()
  emailValidator.isValid = true
  return emailValidator
}

const makeEmailValidatorWithError = () => {
  class EmailValidator {
    validate (email) {
      throw new Error('email not valid')
    }
  }
  return new EmailValidator()
}

const makePhoneValidator = () => {
  class PhoneValidator {
    validate (phone) {
      this.phone = phone
      return this.isValid
    }
  }
  const phoneValidator = new PhoneValidator()
  phoneValidator.isValid = true
  return phoneValidator
}

const makePhoneValidatorWithError = () => {
  class PhoneValidator {
    validate (phone) {
      throw new Error('telefone not valid')
    }
  }
  return new PhoneValidator()
}

const makeSut = () => {
  const phoneValidatorSpy = makePhoneValidator()
  const emailValidatorSpy = makeEmailValidator()
  const cpfValidatorSpy = makeCpfValidator()
  const sut = new RegisterUserRepository({
    cpfValidator: cpfValidatorSpy,
    emailValidator: emailValidatorSpy,
    phoneValidator: phoneValidatorSpy
  })
  return {
    sut,
    cpfValidatorSpy,
    emailValidatorSpy,
    phoneValidatorSpy
  }
}

describe('Register User Repository', () => {
  const validParam = {
    cpf: '334.236.982-01',
    nome: 'Viktor',
    telefone: 11765787865,
    email: 'valid_mail@mail.com'
  }

  beforeEach(async () => {
    await Colaborador.destroy({
      where: {
        cpf: validParam.cpf
      }
    })
  })

  afterAll(() => {
    sequelize.close()
  })

  test('should throw if no params are provided', async () => {
    const { sut } = makeSut()
    const promise = sut.register()
    expect(promise).rejects.toThrow()
  })

  test('should call cpfValidator with correct param', async () => {
    const { sut, cpfValidatorSpy } = makeSut()
    await sut.register(validParam)
    expect(cpfValidatorSpy.cpf).toBe(validParam.cpf)
  })

  test('should call emailValidator with correct param', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    await sut.register(validParam)
    expect(emailValidatorSpy.email).toBe(validParam.email)
  })

  test('should call phoneValidator with correct param', async () => {
    const { sut, phoneValidatorSpy } = makeSut()
    await sut.register(validParam)
    expect(phoneValidatorSpy.phone).toBe(validParam.telefone)
  })

  test('should define random setor_id if setor not present in param', async () => {
    const { sut } = makeSut()
    await sut.register(validParam)
    expect(typeof sut.colaborador.setor).toBe('number')
  })

  test('should return user if it was saved in database', async () => {
    const { sut } = makeSut()
    const response = await sut.register(validParam)
    expect(typeof response.id).toBe('number')
  })

  test('should throw if any validator throw', async () => {
    const suts = [].concat(
      new RegisterUserRepository({
        cpfValidator: makeCpfValidatorWithError(),
        emailValidator: makeEmailValidator(),
        phoneValidator: makePhoneValidator()
      }),
      new RegisterUserRepository({
        cpfValidator: makeCpfValidator(),
        emailValidator: makeEmailValidatorWithError(),
        phoneValidator: makePhoneValidator()
      }),
      new RegisterUserRepository({
        cpfValidator: makeCpfValidator(),
        emailValidator: makeEmailValidator(),
        phoneValidator: makePhoneValidatorWithError()
      })
    )

    for (const sut of suts) {
      const promise = sut.register(validParam)
      expect(promise).rejects.toThrow()
    }
  })
})
