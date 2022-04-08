const Colaborador = require('../models/Colaboradores')
const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = class LoadUserByCPFRepository {
  async load (cpf) {
    if (!cpf) {
      throw new MissingParamError('cpf')
    }
    const funded = await Colaborador.findOne({
      where: { cpf }
    })
    return funded ? funded.dataValues : null
  }
}
