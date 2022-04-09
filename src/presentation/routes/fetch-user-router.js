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
        return HttpResponse.ok(allColaboradores)
      }

      const colaborador = await this.loadUserByIDRepository.load(id)
      if (!colaborador) {
        return HttpResponse.notFound()
      }
      return HttpResponse.ok(colaborador)
    } catch (error) {
      console.log('AHOOU:', error)
      return HttpResponse.serverError(error.message)
    }
  }
}
