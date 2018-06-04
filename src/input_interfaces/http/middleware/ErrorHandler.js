const { Lifetime, RESOLVER } = require('awilix')
const { get } = require('lodash')
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('http-status')

class ErrorHandler {
  static formatError (status, err) {
    const errInfo = {
      code: status,
      date: (new Date()).toISOString(),
      message: err.message
    }

    if (status >= 500) {
      errInfo.trace = err.stack.split('\n')
    }
    if (err.details) {
      errInfo.details = err.details
    }
    return errInfo
  }

  static formatValidationError (err) {
    const fields = err.details.map(({ path }) => path.join(''))
    return {
      code: BAD_REQUEST,
      date: (new Date()).toISOString(),
      message: `Validation error on: ${fields.join(', ')}`,
      trace: err.stack.split('\n'),
      details: err.details.map(({ message, path }) => ({ message, path }))
    }
  }

  static isValidationError (err) {
    return get(err, 'error.isJoi')
  }

  static errorResponse ({ logger }) {
    return (err, req, res, next) => {
      if (ErrorHandler.isValidationError(err)) {
        const errInfo = ErrorHandler.formatValidationError(err.error)
        res.status(BAD_REQUEST)
        res.json(errInfo)
        return
      }

      const status = err.status || INTERNAL_SERVER_ERROR
      const errInfo = ErrorHandler.formatError(status, err)
      logger.error(err, err.cause)
      res.status(status)
      res.json(errInfo)
    }
  }
}

module.exports = ErrorHandler.errorResponse

module.exports[RESOLVER] = {
  name: 'errorHandler',
  lifetime: Lifetime.SINGLETON
}
