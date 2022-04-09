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

describe('Delete User Integration Test', () => {
  afterAll(async () => {
    const registers = await Colaboradores.findAll()
    for (const register of registers) {
      const { id } = register.dataValues
      if (id > 3) {
        await Colaboradores.destroy({
          where: { id }
        })
      }
    }
    sequelize.close()
  })

  test('should return 200', async () => {
    const colaborador = await Colaboradores.create({
      nome: 'To Be Delete',
      telefone: 119467657867,
      email: 'delete_me@mail.com',
      cpf: '876.665.345-98',
      setor: 1
    })

    await request(app)
      .delete('/api/colaborador')
      .query({ id: Number(colaborador.dataValues.id) })
      .expect(200)
  })

  test('should return 404', async () => {
    await request(app)
      .delete('/api/colaborador')
      .query({ id: 677 })
      .expect(404)
  })

  test('should return 400', async () => {
    await request(app)
      .delete('/api/colaborador')
      .expect(400)
  })
})
