const { adapt } = require('../adapters/express-router-adapter')
const { DeleteUserRouterCompose } = require('../composers')

module.exports = router => {
  router.delete('/colaborador', adapt(DeleteUserRouterCompose.compose()))
}
