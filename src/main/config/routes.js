const router = require('epxress').Router()
const fg = require('fast-glob')

module.exports = app => {
  app.use('/api', router)
  fg.sync('**/src/main/routes/**-routes.js').forEach(file => require(`../../../${file}`)(router))
}
