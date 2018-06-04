const { Lifetime, RESOLVER } = require('awilix')
const createError = require('http-errors')
const { INTERNAL_SERVER_ERROR } = require('http-status')

class ErrorMiddleware {
  static addErrorFunctions () {
    return (req, res, next) => {
      res.sendError = ({ code, message, cause, ...args }) => {
        return next(createError(code, message, { cause, ...args }))
      }
      res.sendInternalServerError = message => cause => {
        return next(createError(INTERNAL_SERVER_ERROR, message, { cause }))
      }
      return next()
    }
  }
}

module.exports = ErrorMiddleware.addErrorFunctions

module.exports[RESOLVER] = {
  name: 'errorMiddleware',
  lifetime: Lifetime.SINGLETON
}
