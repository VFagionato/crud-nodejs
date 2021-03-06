const LoadUserByCPFRepository = require('./load-user-cpf-repository')
const RegisterUserRepository = require('./register-user-repository')
const DeleteUserByIDRepository = require('./delete-user-id-repository')
const LoadUserByIDRepository = require('./load-user-id-repository')
const LoadALlUsersRepository = require('./load-all-users-repository')

module.exports = {
  LoadUserByCPFRepository,
  RegisterUserRepository,
  DeleteUserByIDRepository,
  LoadUserByIDRepository,
  LoadALlUsersRepository
}
