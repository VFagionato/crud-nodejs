/* eslint-disable no-undef */

const FetchUserRouter = require('../../../src/presentation/routes/fetch-user-router')

const makeLoadUserByIDRepository = () => {
  class LoadUserByIDRepository {
    async load (id) {
      this.id = id
      return this.user
    }
  }
  const loadUserByIDRepository = new LoadUserByIDRepository()
  loadUserByIDRepository.user = true
  return loadUserByIDRepository
}

const makeLoadUserByIDRepositoryWithError = () => {
  class LoadUserByIDRepository {
    async load (id) {
      throw new Error()
    }
  }
  return new LoadUserByIDRepository()
}

const makeSut = () => {
  const loadUserByIDRepositorySpy = makeLoadUserByIDRepository()
  const sut = new FetchUserRouter({ loadUserByIDRepository: loadUserByIDRepositorySpy })
  return {
    sut,
    loadUserByIDRepositorySpy
  }
}

describe('Fetch User Router', () => {
  const httpRequest = {
    query: {
      id: 1
    }
  }

  afterEach(() => {
    httpRequest.query.id = 1
  })

  test('should return 400 if query is invalid', async () => {
    const { sut } = makeSut()
    httpRequest.query = {}
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(400)
  })

  test('should call loadUserByIDRepository with correct id', async () => {
    const { sut, loadUserByIDRepositorySpy } = makeSut()
    await sut.route(httpRequest)
    expect(loadUserByIDRepositorySpy.id).toBe(httpRequest.query.id)
  })

  test('should return 200 if user is finded', async () => {
    const { sut } = makeSut()
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(200)
  })

  test('should return 404 if user not found', async () => {
    const { sut, loadUserByIDRepositorySpy } = makeSut()
    loadUserByIDRepositorySpy.user = null
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(404)
  })

  test('should return 500 if dependency throw', async () => {
    const sut = new FetchUserRouter({ loadUserByIDRepository: makeLoadUserByIDRepositoryWithError() })
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(500)
  })

  test('should return 500 if invalid dependency is provided', async () => {
    const invalid = {}
    const sut = new FetchUserRouter({ loadUserByIDRepository: invalid })
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(500)
  })
})
