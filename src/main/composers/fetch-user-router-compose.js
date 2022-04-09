const { LoadUserByIDRepository, LoadALlUsersRepository } = require('../../infra/repositories')
const FetchUserRouter = require('../../presentation/routes/fetch-user-router')

module.exports = class FetchUserRouterCompose {
  static compose () {
    const loadUserByIDRepository = new LoadUserByIDRepository()
    const loadAllUsersRepository = new LoadALlUsersRepository()
    return new FetchUserRouter({
      loadUserByIDRepository,
      loadAllUsersRepository
    })
  }
}
