const HttpResponse = require('../helpers/http-response')

module.exports = class RegisterUserRouter {
  constructor ({ registerUserRepository, loadUserByCPFRepository } = {}) {
    this.registerUserRepository = registerUserRepository
    this.loadUserByCPFRepository = loadUserByCPFRepository
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
      const userByCPF = await this.loadUserByCPFRepository.load(cpf)
      if (userByCPF) {
        return HttpResponse.badRequest('CPF already in use')
      }
      const user = await this.registerUserRepository.register({ cpf, nome, telefone, email, setor })
      return HttpResponse.created(user)
    } catch (error) {
      const status = parseInt(error.message.split(' ').pop())
      if (!isNaN(status)) {
        return HttpResponse.customResponse(status)
      }
      return HttpResponse.serverError()
    }
  }
}
