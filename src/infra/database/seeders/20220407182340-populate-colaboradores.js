'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('colaboradores', [
      {
        nome: 'Viktor',
        email: 'viktor@mail.com',
        telefone: 11947292091,
        cpf: '765.667.887-09',
        setor: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        nome: 'Henrique',
        email: 'henrique@mail.com',
        telefone: 11435675781,
        cpf: '566.774.567-01',
        setor: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        nome: 'Gabriel',
        email: 'gabriel@mail.com',
        telefone: 71928763987,
        cpf: '134.654.896-34',
        setor: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('colaboradores', null, {})
  }
}
