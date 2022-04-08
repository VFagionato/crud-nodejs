const express = require('express')
const app = express()
const setupRoutes = require('./routes.js')
require('../../infra/database')

app.use(express.json())

setupRoutes(app)

module.exports = app
