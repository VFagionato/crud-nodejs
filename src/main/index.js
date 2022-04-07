const app = require('./config/app')
const sequelize = require('../infra/database')
const logger = require('../logger')

const port = 3000

const start = async () => {
  try {
    await sequelize.authenticate()
    logger.info('database connected')
    app.listen(port, () => {
      logger.info(`API up on http://localhost:${port}/api`)
    })
  } catch (error) {
    logger.error(error)
  }
}

start()
