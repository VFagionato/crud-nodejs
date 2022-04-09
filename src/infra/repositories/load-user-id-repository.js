const Colaboradores = require('../models/Colaboradores')
const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = class LoadUserByIDRepository {
  async load (id) {
    if (!id) {
      throw new MissingParamError('ID')
    }

    const response = await Colaboradores.findByPk(id)
    if (!response) {
      return null
    }
    return response.dataValues
  }
}
