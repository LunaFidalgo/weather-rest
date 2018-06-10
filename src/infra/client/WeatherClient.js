const { RESOLVER, Lifetime } = require('awilix')
const rp = require('request-promise')

class WeatherClient {
  constructor ({ logger, config }) {
    this.logger = logger
    this.config = config
  }

  _url () {
    const { apiEndpoint, apiKey } = this.config.weather
    const url = `http://${apiEndpoint}${apiKey}`

    this.logger.info(`Get info from ${apiEndpoint}`)
    return url
  }

  async getWeather () {
    this.logger.info('Getting weather info')
    const resp = await rp({
      uri: this._url(),
      json: true,
      method: 'GET'
    })
    return resp
  }
}

module.exports = WeatherClient

module.exports[RESOLVER] = {
  name: 'weatherClient',
  lifetime: Lifetime.SINGLETON
}
