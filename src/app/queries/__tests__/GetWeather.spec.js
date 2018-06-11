const GetWeather = require('../GetWeather')

describe('Get weather', () => {
  const logger = {
    info: jest.fn()
  }
  const config = {}

  let getInfoWeather, weatherRepository

  beforeEach(() => {
    weatherRepository = {
      getInfoWeather () {
        return {
          temperature: 35.0,
          lat: 34.567,
          long: 3.4567
        }
      }
    }

    getInfoWeather = new GetWeather({
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
    getInfoWeather.on('SUCCESS', spySuccess)
    await getInfoWeather.execute()
    expect(spySuccess).toHaveBeenCalled()
  })

  test('emit error', async () => {
    const err = new Error('Something wrong')
    getInfoWeather = new GetWeather({
      weatherRepository: {
        getInfoWeather: () => {
          throw new Error('Something wrong')
        }
      }
    })
    const spy = jest.fn()
    getInfoWeather.on('ERROR', spy)
    await getInfoWeather.execute()
    expect(spy).toHaveBeenCalledWith(err)
  })
})
