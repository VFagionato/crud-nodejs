/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../../src/main/config/app')

const Setores = require('../../../src/infra/models/Setores')
const Colaborador = require('../../../src/infra/models/Colaboradores')
const Sequelize = require('sequelize')
const dbConfig = require('../../../src/main/config/db-config')

const mockConfig = { ...dbConfig, host: 'localhost' }
const sequelize = new Sequelize(mockConfig)

Setores.init(sequelize)
Colaborador.init(sequelize)

describe('Register User Integration Test', () => {
  const path = '/api/colaborador'
  const validBody = {
    cpf: '766.887.221-09',
    nome: 'Jonas',
    email: 'jonas@test.org',
    telefone: 35867545692
  }

  beforeEach(async () => {
    await Colaborador.destroy({
      where: {
        cpf: validBody.cpf
      }
    })
  })

  afterAll(() => {
    sequelize.close()
  })

  test('should return 201 if the colaborador is registered in the database', async () => {
    await request(app)
      .post(path)
      .send(validBody)
      .expect(201)
  })

  test('should return 201 if setor pass in body', async () => {
    await request(app)
      .post(path)
      .send({ ...validBody, setor: 2 })
      .expect(201)
  })

  test('should return 400 if user try register an CPF already registered in database', async () => {
    await request(app)
      .post(path)
      .send(validBody)

    await request(app)
      .post(path)
      .send(validBody)
      .expect(400)
  })

  test('should return 400 if any param is missing', async () => {
    const bodys = [].concat(
      { ...validBody, cpf: undefined },
      { ...validBody, nome: undefined },
      { ...validBody, email: undefined },
      { ...validBody, telefone: undefined }
    )

    for (const body of bodys) {
      await request(app)
        .post(path)
        .send(body)
        .expect(400)
    }
  })

  test('should return 400 if any param do not pass in validation', async () => {
    const bodys = [].concat(
      { ...validBody, cpf: 'invalid_cpf' },
      { ...validBody, email: 'invalid_email' },
      { ...validBody, telefone: 'invalid_phone' },
      { ...validBody, telefone: 'invalid_phone' }
    )

    for (const body of bodys) {
      await request(app)
        .post(path)
        .send(body)
        .expect(400)
    }
  })
})
