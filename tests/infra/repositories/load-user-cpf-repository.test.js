/* eslint-disable no-undef */
const MissingParamError = require('../../../src/utils/errors/missing-param-error')
const Colaborador = require('../../../src/infra/models/Colaboradores')
const Sequelize = require('sequelize')
const dbConfig = require('../../../src/main/config/db-config')

const mockConfig = { ...dbConfig, host: 'localhost' }
const sequelize = new Sequelize(mockConfig)

Colaborador.init(sequelize)

const makeSut = () => {
  return new LoadUserByCPFRepository()
}

class LoadUserByCPFRepository {
  async load (cpf) {
    if (!cpf) {
      throw new MissingParamError('cpf')
    }
    const funded = await Colaborador.findOne({
      where: { cpf }
    })
    return funded ? funded.dataValues : null
  }
}

describe('Load User By CPF Repository', () => {
  const cpf = '765.667.887-09'
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

  test('shoudl return a user if CPF funded', async () => {
    const sut = makeSut()
    const response = await sut.load(cpf)
    expect(response).toBeTruthy()
  })
})