const { DeleteUserByIDRepository } = require('../../infra/repositories')
const DeleteUserRouter = require('../../presentation/routes/delete-user-router')

module.exports = class DeleteUserRouterCompose {
  static compose () {
    const deleteUserByIDRepository = new DeleteUserByIDRepository()
    return new DeleteUserRouter({ deleteUserByIDRepository })
  }
}
