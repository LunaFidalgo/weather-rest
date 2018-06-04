const express = require('express')

const Server = require('../Server')

describe('Server', () => {
  const router = express.Router()
  const config = {
    logger: {},
    server: { port: 3101, timeout: 5000 }
  }
  const logger = {
    info: jest.fn()
  }
  test('Constructor', () => {
    const server = new Server({
      config,
      logger,
      router
    })

    expect(server.app).toBeTruthy()
    expect(logger.info).not.toHaveBeenCalled()
  })

  describe('features', () => {
    let server
    beforeEach(async () => {
      server = new Server({
        config,
        logger,
        router
      })
      await server.start()
    })

    afterEach(() => {
      return server.stop()
    })

    test('can be started', async () => {
      expect(server.app).toBeTruthy()
      expect(logger.info).toHaveBeenCalledWith(`[p ${process.pid}] Listening at port ${config.server.port}`)
    })
  })
})
