const { get } = require('lodash')
const winston = require('winston')
const { RESOLVER, Lifetime } = require('awilix')

class Logger extends winston.Logger {
  constructor ({ config }) {
    const level = get(config, 'logger.level', 'info')
    const jsonOutput = get(config, 'logger.format') === 'json'

    const transports = [
      new winston.transports.Console({
        level,
        json: jsonOutput,
        colorize: !jsonOutput,
        stringify: (obj) => JSON.stringify(obj),
        timestamp: () => new Date().toISOString(),
        handleExceptions: true,
        humanReadableUnhandledException: true
      })
    ]

    super({
      levels: { error: 0, warn: 1, info: 2, debug: 3 },
      level,
      transports
    })
    const _this = this
    this.stream = {
      write (message) {
        _this.info(message)
      }
    }
  }
}

module.exports = Logger

module.exports[RESOLVER] = {
  name: 'logger',
  lifetime: Lifetime.SINGLETON
}
