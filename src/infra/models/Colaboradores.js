const { DataTypes, Model } = require('sequelize')

class Colaboradores extends Model {
  static init (sequelize) {
    super.init({
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      telefone: DataTypes.BIGINT,
      cpf: DataTypes.STRING,
      setor: DataTypes.INTEGER
    }, { sequelize })
  }
}

module.exports = Colaboradores
