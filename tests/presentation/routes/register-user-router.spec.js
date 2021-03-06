/* eslint-disable no-undef */
const RegisterUserRouter = require('../../../src/presentation/routes/register-user-router')

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

const makeLoadUserByCPFRepository = () => {
  class LoadUserByCPFRepository {
    async load (cpf) {
      this.cpf = cpf
      return this.user
    }
  }
  const loadUserByCPFlRepository = new LoadUserByCPFRepository()
  loadUserByCPFlRepository.user = null
  return loadUserByCPFlRepository
}

const makeLoadUserByCPFRepositoryWithError = () => {
  class LoadUserByCPFRepository {
    async load (cpf) {
      throw new Error()
    }
  }
  const loadUserByCPFlRepository = new LoadUserByCPFRepository()
  loadUserByCPFlRepository.user = null
  return loadUserByCPFlRepository
}

const makeSut = () => {
  const loadUserByCPFRepositorySpy = makeLoadUserByCPFRepository()
  const registerUserRepositorySpy = makeRegisterUserRepository()
  const sut = new RegisterUserRouter({
    registerUserRepository: registerUserRepositorySpy,
    loadUserByCPFRepository: loadUserByCPFRepositorySpy
  })
  return {
    sut,
    registerUserRepositorySpy,
    loadUserByCPFRepositorySpy
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

  test('should return 400 if user already exist', async () => {
    const { sut, loadUserByCPFRepositorySpy } = makeSut()
    loadUserByCPFRepositorySpy.user = 'valid_user'
    const response = await sut.route(validRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBe('CPF already in use')
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

  test('should return 500 if invalid dependency is provided', async () => {
    const invalid = {}
    const suts = [].concat(
      new RegisterUserRouter({
        registerUserRepository: invalid,
        loadUserByCPFRepository: makeLoadUserByCPFRepository()
      }),
      new RegisterUserRouter({
        registerUserRepository: makeRegisterUserRepository(),
        loadUserByCPFRepository: invalid
      })
    )

    for (const sut of suts) {
      const response = await sut.route(validRequest)
      expect(response.statusCode).toBe(500)
    }
  })

  test('should return 500 if any dependency throw', async () => {
    const suts = [].concat(
      new RegisterUserRouter(),
      new RegisterUserRouter({
        registerUserRepository: makeRegisterUserRepositoryWithError(),
        loadUserByCPFRepository: makeLoadUserByCPFRepository()
      }),
      new RegisterUserRouter({
        registerUserRepository: makeRegisterUserRepository(),
        loadUserByCPFRepository: makeLoadUserByCPFRepositoryWithError()
      })
    )

    for (const sut of suts) {
      const response = await sut.route(validRequest)
      expect(response.statusCode).toBe(500)
    }
  })
})
