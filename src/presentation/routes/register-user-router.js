const HttpResponse = require('../helpers/http-response')

module.exports = class RegisterUserRouter {
  constructor ({ registerUserRepository } = {}) {
    this.registerUserRepository = registerUserRepository
  }

  async route (httpRequest) {
    try {
      if (!httpRequest.body) {
        return HttpResponse.badRequest('body not present in request')
      }
      const { cpf, nome, telefone, email, setor } = httpRequest.body
      if (!cpf || !nome || !telefone || !email) {
        return HttpResponse.badRequest('body must contain at least: cpf, name, phone, email')
      }
      const user = await this.registerUserRepository.register({ cpf, nome, telefone, email, setor })
      return HttpResponse.created(user)
    } catch (error) {
      return HttpResponse.ServerError(error.message)
    }
  }
}
