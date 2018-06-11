const { RESOLVER, Lifetime } = require('awilix')

const Operation = require('../Operation')

class GetWeather extends Operation {
  constructor ({ logger, config }) {
    super()

    this.logger = logger
    this.config = config
  }

}

module.exports = GetWeather

module.exports[RESOLVER] = {
  name: 'getWeather',
  lifetime: Lifetime.SCOPED
}
