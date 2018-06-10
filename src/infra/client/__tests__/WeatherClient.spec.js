const WeatherClient = require('../WeatherClient')
const nock = require('nock')

describe('Api weather client', () => {
  const logger = {
    info: jest.fn()
  }
  const config = {
    weather: {
      apiEndpoint: 'local=',
      apiKey: 'whatismykey'
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

  test('Get weather', async () =>{
    const weatherClient = new WeatherClient({ logger, config })


  })
})
