const logger = require('pino')({
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: false,
      ignore: 'pid,hostname',
      timestampKey: 'time',
      translateTime: 'SYS:standard'
    }
  }
})

module.exports = logger
