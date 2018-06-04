const mod = require('../logger')

test('creates a logger middleware', () => {
  const config = {
    logger: { format: 'json', requests: 'combined' }
  }
  const middleware = mod({ config, logger: { stream: { write: () => {} } } })
  const next = jest.fn()
  const req = { headers: {} }
  const res = { }
  middleware(req, res, next)
  expect(next).toHaveBeenCalledTimes(1)
})
