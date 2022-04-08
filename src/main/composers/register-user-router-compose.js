const { RegisterUserRepository, LoadUserByCPFRepository } = require('../../infra/repositories')
const { CPFValidator, EmailValidator, PhoneValidator } = require('../../utils/helpers')
const RegisterUserRouter = require('../../presentation/routes/register-user-router')

module.exports = class RegisterUserRouterCompose {
  static compose () {
    const cpfValidator = new CPFValidator()
    const emailValidator = new EmailValidator()
    const phoneValidator = new PhoneValidator()
    const loadUserByCPFRepository = new LoadUserByCPFRepository()
    const registerUserRepository = new RegisterUserRepository({
      cpfValidator,
      emailValidator,
      phoneValidator
    })

    return new RegisterUserRouter({
      loadUserByCPFRepository,
      registerUserRepository
    })
  }
}
