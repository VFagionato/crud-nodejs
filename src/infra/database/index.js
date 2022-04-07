const Sequelize = require('sequelize')
const dbConfig = require('../../main/config/db-config')

const sequelize = new Sequelize(dbConfig)

module.exports = sequelize
