/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../../src/main/config/app')

const Colaboradores = require('../../../src/infra/models/Colaboradores')
const Setores = require('../../../src/infra/models/Setores')
const Sequelize = require('sequelize')
const dbConfig = require('../../../src/main/config/db-config')

const mockConfig = { ...dbConfig, host: 'localhost' }
const sequelize = new Sequelize(mockConfig)

Colaboradores.init(sequelize)
Setores.init(sequelize)
Colaboradores.associate(sequelize.models)

describe('Fetch User Integration Test', () => {
  const path = '/api/colaborador'
  afterAll(() => {
    sequelize.close()
  })

  test('should return 200', async () => {
    await request(app)
      .get(path)
      .query({ id: 1 })
      .expect(200)
  })

  test('should return 404', async () => {
    await request(app)
      .get(path)
      .query({ id: 888 })
      .expect(404)
  })

  test('should return 200', async () => {
    await request(app)
      .get(path)
      .expect(200)
  })
})
