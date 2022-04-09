const { DataTypes, Model } = require('sequelize')

class Colaboradores extends Model {
  static init (sequelize) {
    super.init({
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      telefone: DataTypes.BIGINT,
      cpf: DataTypes.STRING
    }, { sequelize })
  }

  static associate (models) {
    this.belongsTo(models.Setores, {
      foreignKey: 'setor',
      as: 'belongs_to'
    })
  }
}

module.exports = Colaboradores
