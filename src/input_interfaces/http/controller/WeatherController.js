const { createController } = require('awilix-express')
const { OK } = require('http-status')

class WeatherController {
  constructor ({ getWeatherAction }) {
    this.getWeatherAction = getWeatherAction
  }

  async getWeather (req, res, next) {
    const { SUCCESS, ERROR } = this.getWeatherAction.outputs

    this.getWeatherAction
      .on(SUCCESS, data => res.status(OK).send(data))
      .on(ERROR, res.sendInternalServerError(`Can't get weather info`))
      .execute()
  }
}

module.exports = createController(WeatherController)
  .get('/weather', 'getWeather')
