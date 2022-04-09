/* eslint-disable no-undef */
const MissingParamError = require('../../../src/utils/errors/missing-param-error')
const Colaborador = require('../../../src/infra/models/Colaboradores')
const Sequelize = require('sequelize')
const dbConfig = require('../../../src/main/config/db-config')

const LoadUserByCPFRepository = require('../../../src/infra/repositories/load-user-cpf-repository')

const mockConfig = { ...dbConfig, host: 'localhost' }
const sequelize = new Sequelize(mockConfig)

Colaborador.init(sequelize)

const makeSut = () => {
  return new LoadUserByCPFRepository()
}

describe('Load User By CPF Repository', () => {
  const cpf = '765.667.887-09'

  afterAll(() => {
    sequelize.close()
  })

  test('should throw if no CPF is provided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('cpf'))
  })

  test('should return null if no colaborador is funded', async () => {
    const sut = makeSut()
    const response = await sut.load('unregisterd_cpf')
    expect(response).toBeNull()
  })

  test('should return a user if CPF funded', async () => {
    const sut = makeSut()
    const response = await sut.load(cpf)
    expect(response).toBeTruthy()
  })
})
