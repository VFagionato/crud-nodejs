const express = require('express')
const app = express()
const setupRoutes = require('./routes')

setupRoutes(app)

module.exports = app
