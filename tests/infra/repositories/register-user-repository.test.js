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

const makeSut = () => {
  const cpfValidatorSpy = makeCpfValidator()
  const sut = new RegisterUserRepository({
    cpfValidator: cpfValidatorSpy
  })
  return {
    sut,
    cpfValidatorSpy
  }
}

class RegisterUserRepository {
  constructor ({ cpfValidator }) {
    this.cpfValidator = cpfValidator
  }

  async register ({ cpf, email, nome, telefone, setor }) {
    try {
      await this.cpfValidator.validate(cpf)
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
})
