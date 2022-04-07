/* eslint-disable no-undef */
const HttpResponse = require('../helpers/http-response')

const makeRegisterUserRepository = () => {
  class RegisterUserRepository {
    async register ({ cpf, nome, telefone, email, setor = null }) {
      this.cpf = cpf
      this.nome = nome
      this.telefone = telefone
      this.email = email
      this.setor = setor
      return this.user
    }
  }
  const registerUserRepository = new RegisterUserRepository()
  registerUserRepository.user = {
    id: 'valid_id',
    cpf: '768.554.879-45',
    email: 'joao@mail.com',
    nome: 'João das Neves',
    telefone: 45965675445,
    setor: 'setor_id'
  }
  return registerUserRepository
}

const makeRegisterUserRepositoryWithError = () => {
  class RegisterUserRepository {
    async register () {
      throw new Error()
    }
  }
  return new RegisterUserRepository()
}

const makeSut = () => {
  const registerUserRepositorySpy = makeRegisterUserRepository()
  const sut = new RegisterUserRouter({ registerUserRepository: registerUserRepositorySpy })
  return {
    sut,
    registerUserRepositorySpy
  }
}

class RegisterUserRouter {
  constructor ({ registerUserRepository } = {}) {
    this.registerUserRepository = registerUserRepository
  }

  async route (httpRequest) {
    try {
      if (!httpRequest.body) {
        return HttpResponse.badRequest('body not present in request')
      }
      const { cpf, nome, telefone, email, setor } = httpRequest.body
      if (!cpf || !nome || !telefone || !email) {
        return HttpResponse.badRequest('body must contain at least: cpf, name, phone, email')
      }
      const user = await this.registerUserRepository.register({ cpf, nome, telefone, email, setor })
      return HttpResponse.created(user)
    } catch (error) {
      return HttpResponse.ServerError(error.message)
    }

  }
}

describe('Register User Router', () => {
  const validRequest = {
    body: {
      cpf: '768.554.879-45',
      email: 'joao@mail.com',
      nome: 'João das Neves',
      telefone: 45965675445
    }
  }

  test('should return 400 if httpRequest do not have a body', async () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBe('body not present in request')
  })

  test('should return 400 if any require param is missing', async () => {
    const { sut } = makeSut()
    const requests = [].concat(
      { body: { ...validRequest.body, cpf: undefined } },
      { body: { ...validRequest.body, email: undefined } },
      { body: { ...validRequest.body, nome: undefined } },
      { body: { ...validRequest.body, telefone: undefined } }
    )

    for (const request of requests) {
      const response = await sut.route(request)
      expect(response.statusCode).toBe(400)
      expect(response.body).toBe('body must contain at least: cpf, name, phone, email')
    }
  })

  test('should call registerUserRepository with correct params', async () => {
    const { sut, registerUserRepositorySpy } = makeSut()
    await sut.route(validRequest)
    expect(registerUserRepositorySpy.cpf).toBe(validRequest.body.cpf)
    expect(registerUserRepositorySpy.nome).toBe(validRequest.body.nome)
    expect(registerUserRepositorySpy.email).toBe(validRequest.body.email)
    expect(registerUserRepositorySpy.telefone).toBe(validRequest.body.telefone)
    expect(registerUserRepositorySpy.setor).toBe(null)
  })

  test('should return 201 with user registered successfully', async () => {
    const { sut, registerUserRepositorySpy } = makeSut()
    const response = await sut.route(validRequest)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(registerUserRepositorySpy.user)
  })

  test('should return 500 with registerUserRepository throw', async () => {
    const sut = new RegisterUserRouter({ registerUserRepository: makeRegisterUserRepositoryWithError() })
    const response = await sut.route(validRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toBe('')
  })
})
