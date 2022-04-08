const MissingParamError = require('../errors/missing-param-error')

module.exports = class EmailValidator {
  constructor () {
    this.regex = /(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
  }

  validate (email) {
    if (!email) {
      throw new MissingParamError('email')
    }

    const isValid = this.regex.test(email)
    if (!isValid) {
      throw new Error('Email invalid 400')
    }
    return true
  }
}
