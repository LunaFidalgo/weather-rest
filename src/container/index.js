const { Lifetime, createContainer, asValue } = require('awilix')
const { scopePerRequest } = require('awilix-express')
const config = require('config')

const container = createContainer()

container
  .loadModules([
    'app/Application.js',
    'app/queries/GetWeather.js',

    'infra/logging/Logger.js',
    'infra/client/WeatherClient.js',
    'infra/repositories/WeatherRepository.js',

    'input_interfaces/http/router.js',
    'input_interfaces/http/Server.js',

    'input_interfaces/http/middleware/ErrorHandler.js',
    'input_interfaces/http/middleware/ErrorMiddleware.js',
    'input_interfaces/http/middleware/logger.js'
  ], {
    resolverOptions: {
      lifetime: Lifetime.SINGLETON
    },
    cwd: `${__dirname}/../`
  })

container
  .register({
    config: asValue(config),
    containerMiddleware: asValue(scopePerRequest(container))
  })

module.exports = container
