const Colaboradores = require('../models/Colaboradores')
const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = class DeleteUserByIDRepository {
  async delete (id) {
    if (!id) {
      throw new MissingParamError('ID')
    }

    return await Colaboradores.destroy({
      where: { id }
    })
  }
}
