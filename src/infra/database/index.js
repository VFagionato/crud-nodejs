const Sequelize = require('sequelize')
const dbConfig = require('../../main/config/db-config')
const Setores = require('../models/Setores')
const Colaboradores = require('../models/Colaboradores')

const sequelize = new Sequelize(dbConfig)

Setores.init(sequelize)
Colaboradores.init(sequelize)

Setores.hasMany(Colaboradores)
Colaboradores.belongsTo(Setores)

module.exports = sequelize
