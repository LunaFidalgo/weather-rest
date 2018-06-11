const GetWeather = require('../GetWeather')

describe('Get weather', () => {
  const logger = {
    info: jest.fn()
  }
  const config = {}

  let getWeatherInfo, weatherRepository

  beforeEach(() => {
    weatherRepository = {
      getWeatherInfo () {
        return {
          temperature: 35.0,
          lat: 34.567,
          long: 3.4567
        }
      }
    }

    getWeatherInfo = new GetWeather({
      weatherRepository: weatherRepository
    })
  })

  test('Instance', () => {
    const getWeather = new GetWeather({ logger, config })

    expect(getWeather).toBeDefined()
    expect(getWeather).toBeInstanceOf(GetWeather)
    expect(getWeather.outputs).toMatchObject({
      SUCCESS: 'SUCCESS',
      ERROR: 'ERROR'
    })
  })

  test('Emit success', async () => {
    const spySuccess = jest.fn()
    getWeatherInfo.on('SUCCESS', spySuccess)
    await getWeatherInfo.execute()
    expect(spySuccess).toHaveBeenCalled()
  })

  test('emit error', async () => {
    const err = new Error('Something wrong')
    getWeatherInfo = new GetWeather({
      weatherRepository: {
        getWeatherInfo: () => {
          throw new Error('Something wrong')
        }
      }
    })
    const spy = jest.fn()
    getWeatherInfo.on('ERROR', spy)
    await getWeatherInfo.execute()
    expect(spy).toHaveBeenCalledWith(err)
  })
})
