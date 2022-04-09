/* eslint-disable no-undef */

const DeleteUserRouter = require('../../../src/presentation/routes/delete-user-router')

const makeDeleteUserByIDRepository = () => {
  class DeleteUserByIDRepository {
    async delete (id) {
      this.id = id
      return this.deletedCount
    }
  }
  const deleteUserByIDRepository = new DeleteUserByIDRepository()
  deleteUserByIDRepository.deletedCount = 1
  return deleteUserByIDRepository
}

const makeDeleteUserByIDRepositoryWithError = () => {
  class DeleteUserByIDRepository {
    async delete (id) {
      throw new Error('thow by dependency')
    }
  }
  return new DeleteUserByIDRepository()
}

const makeSut = () => {
  const deleteUserByIDRepositorySpy = makeDeleteUserByIDRepository()
  const sut = new DeleteUserRouter({
    deleteUserByIDRepository: deleteUserByIDRepositorySpy
  })
  return {
    sut,
    deleteUserByIDRepositorySpy
  }
}

describe('Delete User Router', () => {
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

  test('should call deleteUserByIDRepository with correct id', async () => {
    const { sut, deleteUserByIDRepositorySpy } = makeSut()
    await sut.route(httpRequest)
    expect(deleteUserByIDRepositorySpy.id).toBe(httpRequest.query.id)
  })

  test('should return 200 if id is deleted', async () => {
    const { sut } = makeSut()
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(200)
  })

  test('should return 404 if id not found', async () => {
    const { sut, deleteUserByIDRepositorySpy } = makeSut()
    deleteUserByIDRepositorySpy.deletedCount = 0
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(404)
  })

  test('should return 500 if dependency throw', async () => {
    const sut = new DeleteUserRouter({ deleteUserByIDRepository: makeDeleteUserByIDRepositoryWithError() })
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(500)
  })

  test('should return 500 if invalid dependency is provided', async () => {
    const invalid = {}
    const sut = new DeleteUserRouter({ deleteUserByIDRepository: invalid })
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(500)
  })
})
