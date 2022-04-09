/* eslint-disable no-undef */
const MissingParamError = require('../../../src/utils/errors/missing-param-error')
const Colaboradores = require('../../../src/infra/models/Colaboradores')
const Sequelize = require('sequelize')
const dbConfig = require('../../../src/main/config/db-config')
const LoadUserByIDRepository = require('../../../src/infra/repositories/load-user-id-repository')

const mockConfig = { ...dbConfig, host: 'localhost' }
const sequelize = new Sequelize(mockConfig)

Colaboradores.init(sequelize)

const makeSut = () => {
  return new LoadUserByIDRepository()
}

describe('Load User By ID Repository', () => {
  afterAll(async () => {
    sequelize.close()
  })

  test('should throw if no ID is provided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('ID'))
  })

  test('should return null if no colaborador is finded', async () => {
    const sut = makeSut()
    const response = await sut.load(5)
    expect(response).toBeNull()
  })

  test('should return a colaborador if finded', async () => {
    const sut = makeSut()
    const response = await sut.load(1)
    expect(response).toBeTruthy()
  })
})
