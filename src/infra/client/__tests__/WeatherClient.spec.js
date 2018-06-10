const WeatherClient = require('../WeatherClient')
const nock = require('nock')
const mock = require('./__mocks__/mock_data')

describe('Api weather client', () => {
  const logger = {
    info: jest.fn()
  }
  const config = {
    weather: {
      apiEndpoint: 'api.openweathermap.org/data/2.5/weather?q=Madrid&appid=',
      apiKey: '12345'
    }
  }

  test('client instance', () => {
    const weatherClient = new WeatherClient({ logger, config })

    expect(weatherClient).toBeDefined()
  })

  test('Construct url', () => {
    const weatherClient = new WeatherClient({ logger, config })

    expect(weatherClient._url()).toMatchSnapshot()
  })

  test('Get weather', async () => {
    const weatherClient = new WeatherClient({ logger, config })

    nock(`http://api.openweathermap.org`)
      .get('/data/2.5/weather')
      .query({
        q: 'Madrid',
        appid: '12345'
      })
      .reply(200, mock.mockResponseMadrid())
    nock.disableNetConnect()

    const resp = await weatherClient.getWeather()
    nock.enableNetConnect()

    expect(resp).toMatchSnapshot()
  })
})
