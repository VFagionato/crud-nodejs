const HttpResponse = require('../helpers/http-response')

module.exports = class DeleteUserRouter {
  constructor ({ deleteUserByIDRepository } = {}) {
    this.deleteUserByIDRepository = deleteUserByIDRepository
  }

  async route (httpRequest) {
    try {
      const { id } = httpRequest.query
      if (!id) {
        return HttpResponse.badRequest()
      }

      const isDeleted = await this.deleteUserByIDRepository.delete(id)
      if (isDeleted < 1) {
        return HttpResponse.notFound()
      }
      return HttpResponse.ok()
    } catch (error) {
      console.log(error)
      const status = parseInt(error.message.split(' ').pop())
      if (!isNaN(status)) {
        return HttpResponse.customResponse(status)
      }
      return HttpResponse.serverError(error.message)
    }
  }
}
