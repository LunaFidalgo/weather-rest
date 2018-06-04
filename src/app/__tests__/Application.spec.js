const Application = require('../Application')

describe('Application', () => {
  const config = {}
  test('Application started', async () => {
    const server = {
      start: jest.fn()
    }
    const logger = {}

    const app = new Application({ config, server, logger })
    await app.start()
    expect(server.start).toHaveBeenCalled()
  })

  test('Application stopped', async () => {
    const server = {
      start: jest.fn(),
      stop: jest.fn()
    }

    const logger = {}
    const app = new Application({ config, server, logger })
    await app.start()
    await app.stop()
    expect(server.stop).toHaveBeenCalled()
  })
})
