const Logger = require('../Logger.js')

describe('Logger', () => {
  test('Create logger', () => {
    const config = {
      name: 'test',
      logger: { level: 'debug' }
    }
    const logger = new Logger({ config })
    expect(logger).toBeDefined()
    expect(logger.level).toBe('debug')
  })

  test('Default level', () => {
    const config = {
      name: 'test',
      logger: {}
    }
    const logger = new Logger({ config, logger: { stream: {} } })
    expect(logger).toBeDefined()
    expect(logger.level).toBe('info')
  })

  test('Expose stream', () => {
    const config = {
      name: 'test',
      logger: {}
    }
    const logger = new Logger({ config, logger: { stream: {} } })
    logger.info = jest.fn()
    expect(typeof logger.stream.write).toBe('function')
    logger.stream.write('test')
    expect(logger.info).toHaveBeenCalledWith('test')
  })

})
