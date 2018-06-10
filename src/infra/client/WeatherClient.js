const { RESOLVER, Lifetime } = require('awilix')

class WeatherClient {
  constructor ({ logger, config }) {
    this.logger = logger
    this.config = config
  }

  _url () {
    const { apiEndpoint, apiKey } = this.config.weather
    const url = `${apiEndpoint}${apiKey}`

    this.logger.info(`Get info from ${apiEndpoint}`)
    return url
  }


}

module.exports = WeatherClient

module.exports[RESOLVER] = {
  name: 'weatherClient',
  lifetime: Lifetime.SINGLETON
}
