const Sequelize = require('sequelize')
const dbConfig = require('../../main/config/db-config')
const Setores = require('../models/Setores')

const sequelize = new Sequelize(dbConfig)

Setores.init(sequelize)

module.exports = sequelize
