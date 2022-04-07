/* eslint-disable no-undef */
const Setor = require('../../../src/infra/models/Setores')
const Colaborador = require('../../../src/infra/models/Colaboradores')
const Sequelize = require('sequelize')
const dbConfig = require('../../../src/main/config/db-config')

const mockConfig = { ...dbConfig, host: 'localhost' }
const sequelize = new Sequelize(mockConfig)

Setor.init(sequelize)
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

class RegisterUserRepository {
  constructor ({ cpfValidator, emailValidator, phoneValidator }) {
    this.cpfValidator = cpfValidator
    this.emailValidator = emailValidator
    this.phoneValidator = phoneValidator
  }

  async register ({ cpf, email, nome, telefone, setor }) {
    try {
      this.cpfValidator.validate(cpf)
      this.emailValidator.validate(email)
      this.phoneValidator.validate(telefone)

      if (!setor) {
        const ids = []
        const setores = await Setor.findAll()
        for (const item of setores) {
          ids.push(item.dataValues.id)
        }
        setor = ids[Math.floor((Math.random() * ids.length))]
      }

      this.colaborador = Colaborador.build({ cpf, email, nome, telefone, setor })
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
}

describe('Register User Repository', () => {
  const validParam = {
    cpf: '334.236.982-01',
    nome: 'Viktor',
    telefone: 11765787865,
    email: 'valid_mail@mail.com'
  }
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

  test('should define setor id random if setor not present in param', async () => {
    const { sut } = makeSut()
    await sut.register(validParam)
    expect(typeof sut.colaborador.setor).toBe('number')
  })
})
