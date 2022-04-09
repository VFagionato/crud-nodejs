const HttpResponse = require('../helpers/http-response')

module.exports = class FetchUserRouter {
  constructor ({ loadUserByIDRepository }) {
    this.loadUserByIDRepository = loadUserByIDRepository
  }

  async route (httpRequest) {
    try {
      const { id } = httpRequest.query
      if (!id) {
        return HttpResponse.badRequest()
      }

      const colaborador = await this.loadUserByIDRepository.load(id)
      if (!colaborador) {
        return HttpResponse.notFound()
      }
      return HttpResponse.ok(colaborador.dataValues)
    } catch (error) {
      const status = parseInt(error.message.split(' ').pop())
      if (!isNaN(status)) {
        return HttpResponse.customResponse(status)
      }
      return HttpResponse.serverError()
    }
  }
}