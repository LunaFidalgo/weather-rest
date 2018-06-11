const WeatherRepository = require('../WeatherRepository')
const weatherClient = require('./__mocks__/weatherClient')

describe('Weather repository', () => {
  let repo

  beforeEach(() => {
    repo = new WeatherRepository({ weatherClient })
  })

  describe('Query data', () => {
    test('Get weather info', async () => {
      const weather = repo.getWeatherInfo()
      expect(weather).toMatchSnapshot()
    })

    test('Returned value', async () => {
      const resp = repo.getWeatherInfo()
      expect(resp).toBeDefined()
    })
  })
})
