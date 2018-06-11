const GetWeather = require('../GetWeather')

describe('Get weather', () => {
  const logger = {
    info: jest.fn()
  }
  const config = {}

  test('Instance', () => {
    const getWeather = new GetWeather({ logger, config })

    expect(getWeather).toBeDefined()
  })
})
