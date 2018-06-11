const express = require('express')
const bodyParser = require('body-parser')

const request = require('supertest')
const { asValue, createContainer } = require('awilix')
const { controller, scopePerRequest } = require('awilix-express')

const WeatherController = require('../WeatherController')

const mockOperation = require('../../__tests__/mock_operation')

describe('Weather Controller', () => {
  let app, container

  beforeEach(() => {
    app = express()
    container = createContainer()
    app.use((req, res, next) => {
      res.sendInternalServerError = (msg) => () => res.status(500).send(msg)
      res.sendError = (err) => res.status(err.code).send()
      return next()
    })
    app.use(bodyParser.json())
    app.use(scopePerRequest(container))
    app.use(controller(WeatherController))
    container.register({
      getWeatherAction: asValue({})
    })
  })

  afterEach(() => {
    app = null
  })

  test('Get Weather', done => {
    const weatherData = { temperature: 15.4 }
    const operation = mockOperation('SUCCESS', weatherData)
    container.register({
      getWeatherAction: asValue(operation)
    })

    request(app)
      .get('/weather')
      .expect(200)
      .end((err, res) => {
        expect(err).toBeFalsy()
        expect(operation.execute).toHaveBeenCalled()
        expect(operation.fns['SUCCESS']).toHaveBeenCalledWith(weatherData)
        done()
      })
  })
  test('Handle /weather error', done => {
    const operation = mockOperation('ERROR')
    container.register({
      getWeatherAction: asValue(operation)
    })
    request(app)
      .get('/weather')
      .expect(500)
      .end((err, res) => {
        expect(err).toBeFalsy()
        expect(operation.execute).toHaveBeenCalled()
        expect(operation.fns['ERROR']).toHaveBeenCalled()
        done()
      })
  })
})
