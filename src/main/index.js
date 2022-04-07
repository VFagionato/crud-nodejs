const app = require('./config/app')
const sequelize = require('../infra/database')

const start = async () => {
  try {
    await sequelize.autenticate()
    app.listen(3000)
  } catch (error) {
    console.error(error)
  }
}

start()
