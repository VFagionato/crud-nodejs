const Colaborador = require('../models/Colaboradores')
const Setores = require('../models/Setores')

module.exports = class RegisterUserRepository {
  constructor ({ cpfValidator, emailValidator, phoneValidator }) {
    this.cpfValidator = cpfValidator
    this.emailValidator = emailValidator
    this.phoneValidator = phoneValidator
  }

  async register ({ cpf, email, nome, telefone, setor }) {
    try {
      this.cpfValidator.validate(cpf)
      this.emailValidator.validate(email)
      this.phoneValidator.validate(telefone)

      if (!setor) {
        const ids = []
        const setores = await Setores.findAll()
        for (const item of setores) {
          ids.push(item.dataValues.id)
        }
        setor = ids[Math.floor((Math.random() * ids.length))]
      }

      this.colaborador = await Colaborador.create({ cpf, email, nome, telefone, setor })
      return this.colaborador.dataValues
    } catch (error) {
      throw new Error(error)
    }
  }
}
