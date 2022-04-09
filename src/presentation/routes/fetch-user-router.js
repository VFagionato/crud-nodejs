const HttpResponse = require('../helpers/http-response')

module.exports = class FetchUserRouter {
  constructor ({ loadUserByIDRepository, loadAllUsersRepository }) {
    this.loadUserByIDRepository = loadUserByIDRepository
    this.loadAllUsersRepository = loadAllUsersRepository
  }

  async route (httpRequest) {
    try {
      const { id } = httpRequest.query
      if (!id) {
        const allColaboradores = await this.loadAllUsersRepository.load()
        if (!allColaboradores.length) {
          return HttpResponse.empty()
        }
        return HttpResponse.ok(allColaboradores)
      }

      const colaborador = await this.loadUserByIDRepository.load(id)
      if (!colaborador) {
        return HttpResponse.notFound()
      }
      return HttpResponse.ok(colaborador.dataValues)
    } catch (error) {
      return HttpResponse.serverError(error.message)
    }
  }
}
