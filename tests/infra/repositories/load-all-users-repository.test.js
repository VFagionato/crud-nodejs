/* eslint-disable no-undef */
const Colaboradores = require('../../../src/infra/models/Colaboradores')
const Setores = require('../../../src/infra/models/Setores')
const Sequelize = require('sequelize')
const dbConfig = require('../../../src/main/config/db-config')

const LoadALlUsersRepository = require('../../../src/infra/repositories/load-all-users-repository')

const mockConfig = { ...dbConfig, host: 'localhost' }
const sequelize = new Sequelize(mockConfig)

Colaboradores.init(sequelize)
Setores.init(sequelize)
Colaboradores.associate(sequelize.models)

describe('Load All Users Repository', () => {
  afterAll(() => {
    sequelize.close()
  })
  test('should return a object', async () => {
    const sut = new LoadALlUsersRepository()
    const response = await sut.load()
    expect(typeof response).toBe('object')
  })

  test('should return a object with least one property', async () => {
    const sut = new LoadALlUsersRepository()
    const response = await sut.load()
    expect(Object.keys(response).length >= 1).toBe(true)
  })
})
