const MissingParamError = require('../errors/missing-param-error')

module.exports = class PhoneValidator {
  validate (phone) {
    if (!phone) {
      throw new MissingParamError('phone')
    }
    if (typeof phone !== 'number' ||
    phone.toString().length < 10 || phone.toString().length > 11) {
      throw new Error('Phone invalid 400')
    }
    return true
  }
}
