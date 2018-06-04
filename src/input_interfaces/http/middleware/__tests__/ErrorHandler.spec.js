const errorHandlerMiddleware = require('../ErrorHandler')

describe('Error handler', () => {
  const errorMock = jest.fn()

  test('Middleware logs all errors', () => {
    const next = jest.fn()
    const middleware = errorHandlerMiddleware({
      logger: {
        error: errorMock
      }
    })
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    const req = {}
    const err = new Error('Test')
    middleware(err, req, res, next)
    expect(res.status).toHaveBeenCalled()
    expect(errorMock).toHaveBeenCalledWith(err, undefined)
  })

  test('Middleware logs all errors and details', () => {
    const next = jest.fn()
    const middleware = errorHandlerMiddleware({
      logger: {
        error: errorMock
      }
    })
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    const req = {}
    const err = new Error('Test')
    err.details = 'This should be added'
    middleware(err, req, res, next)
    expect(res.status).toHaveBeenCalled()
    expect(errorMock).toHaveBeenCalledWith(err, undefined)
  })
})
