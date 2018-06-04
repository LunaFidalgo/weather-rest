const errorFormatterMiddleware = require('../ErrorMiddleware')

describe('Error middleware', () => {
  test('Add error handler functions to response', () => {
    const next = jest.fn()
    const middleware = errorFormatterMiddleware()
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    const req = {}
    middleware(req, res, next)
    expect(typeof res.sendError).toBe('function')
    expect(typeof res.sendInternalServerError).toBe('function')
  })

  test('Add error handler functions to response', () => {
    const next = jest.fn()
    const middleware = errorFormatterMiddleware()
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    const req = {}
    middleware(req, res, next)
    expect(typeof res.sendError).toBe('function')
    expect(typeof res.sendInternalServerError).toBe('function')
  })
})
