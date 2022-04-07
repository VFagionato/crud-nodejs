'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('setores', [
      {
        description: 'Desenvolvimento',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        description: 'Recursos Humanos',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        description: 'Comercial',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('setores', null, {})
  }
}
