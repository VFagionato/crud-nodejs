/* eslint-disable no-undef */

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
    } catch (error) {
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
})
