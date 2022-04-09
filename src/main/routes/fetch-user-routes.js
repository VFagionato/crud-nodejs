const { adapt } = require('../adapters/express-router-adapter')
const { FetchUserRouterCompose } = require('../composers')

module.exports = router => {
  router.get('/colaborador', adapt(FetchUserRouterCompose.compose()))
}
