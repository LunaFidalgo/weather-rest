const morgan = require('morgan')
const { Lifetime, RESOLVER } = require('awilix')

module.exports = ({ config, logger }) => {
  return morgan('combined', { stream: logger.stream })
}

module.exports[RESOLVER] = {
  name: 'loggerMiddleware',
  lifetime: Lifetime.SINGLETON
}
