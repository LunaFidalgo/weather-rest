const { Lifetime, RESOLVER } = require('awilix')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { loadControllers } = require('awilix-express')

module.exports = ({ config, containerMiddleware, errorMiddleware, errorHandler, loggerMiddleware }) => {
  const router = express.Router()
  const apiRouter = express.Router()

  apiRouter
    .use(loggerMiddleware)
    .use(errorMiddleware)
    .use(containerMiddleware)
    .use(loadControllers('controller/**/Controller.js', { cwd: __dirname }))

  router
    .use(bodyParser.json())
    .use(cors())
    .use('/api', apiRouter)
    .use(errorHandler)

  return router
}

module.exports[RESOLVER] = {
  name: 'router',
  lifetime: Lifetime.SINGLETON
}
