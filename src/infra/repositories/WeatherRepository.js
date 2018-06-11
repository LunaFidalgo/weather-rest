const { RESOLVER, Lifetime } = require('awilix')

class WeatherRepository {
  constructor ({ weatherClient }) {
    this.weatherClient = weatherClient
  }

  async getWeatherInfo () {
    const resp = await this.weatherClient.getWeather()
    return resp
  }
}

module.exports = WeatherRepository

module.exports[RESOLVER] = {
  name: 'weatherRepository',
  lifetime: Lifetime.SINGLETON
}
