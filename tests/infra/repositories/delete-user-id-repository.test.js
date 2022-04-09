/* eslint-disable no-undef */
const MissingParamError = require('../../../src/utils/errors/missing-param-error')
const Colaboradores = require('../../../src/infra/models/Colaboradores')
const Sequelize = require('sequelize')
const dbConfig = require('../../../src/main/config/db-config')
const DeleteUserByIDRepository = require('../../../src/infra/repositories/delete-user-id-repository')

const mockConfig = { ...dbConfig, host: 'localhost' }
const sequelize = new Sequelize(mockConfig)

Colaboradores.init(sequelize)

const makeSut = () => {
  return new DeleteUserByIDRepository()
}

describe('Delete User By ID Repository', () => {
  afterAll(async () => {
    sequelize.close()
  })

  test('should throw if no ID is provided', async () => {
    const sut = makeSut()
    const promise = sut.delete()
    expect(promise).rejects.toThrow(new MissingParamError('ID'))
  })

  test('should return 0 if no colaborador is deleted', async () => {
    const sut = makeSut()
    const response = await sut.delete(4)
    expect(response).toBe(0)
  })

  test('should return 1 if colaborador is deleted', async () => {
    const sut = makeSut()
    const colaborador = await Colaboradores.create({
      nome: 'To Be Delete',
      telefone: 119467657867,
      email: 'delete_me@mail.com',
      cpf: '876.665.345-98',
      setor: 1
    })
    const response = await sut.delete(colaborador.dataValues.id)
    expect(response).toBe(1)
  })
})
