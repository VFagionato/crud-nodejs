const { DataTypes, Model } = require('sequelize')

class Setores extends Model {
  static init (sequelize) {
    super.init({
      description: DataTypes.TEXT
    }, { sequelize })
  }
}

module.exports = Setores
