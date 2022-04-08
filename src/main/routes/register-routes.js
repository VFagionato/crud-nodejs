const { adapt } = require('../adapters/express-router-adapter')
const RegisterUserRouterCompose = require('../composers/register-user-router-compose')

module.exports = router => {
  router.post('/colaborador', adapt(RegisterUserRouterCompose.compose()))
}
