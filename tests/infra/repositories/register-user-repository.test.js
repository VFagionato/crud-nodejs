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

const makeSut = () => {
  const emailValidatorSpy = makeEmailValidator()
  const cpfValidatorSpy = makeCpfValidator()
  const sut = new RegisterUserRepository({
    cpfValidator: cpfValidatorSpy,
    emailValidator: emailValidatorSpy
  })
  return {
    sut,
    cpfValidatorSpy,
    emailValidatorSpy
  }
}

class RegisterUserRepository {
  constructor ({ cpfValidator, emailValidator }) {
    this.cpfValidator = cpfValidator
    this.emailValidator = emailValidator
  }

  async register ({ cpf, email, nome, telefone, setor }) {
    try {
      this.cpfValidator.validate(cpf)
      this.emailValidator.validate(email)
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

  test('shoudl call emailValidator with correct param', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    await sut.register(validParam)
    expect(emailValidatorSpy.email).toBe(validParam.email)
  })
})
