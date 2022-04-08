const MissingParamError = require('../errors/missing-param-error')

module.exports = class CPFValidator {
  constructor () {
    this.regex = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/
  }

  validate (cpf) {
    if (!cpf) {
      throw new MissingParamError('cpf')
    }
    const isValid = this.regex.test(cpf)
    if (!isValid) {
      throw new Error('CPF invalid 400')
    }
    return true
  }
}
