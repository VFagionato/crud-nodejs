const { LoadUserByIDRepository } = require('../../infra/repositories')
const FetchUserRouter = require('../../presentation/routes/fetch-user-router')

module.exports = class FetchUserRouterCompose {
  static compose () {
    const loadUserByIDRepository = new LoadUserByIDRepository()
    return new FetchUserRouter({ loadUserByIDRepository })
  }
}
