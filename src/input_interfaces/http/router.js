const { Lifetime, RESOLVER } = require('awilix')
const { Router } = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { loadControllers } = require('awilix-express')

module.exports = ({ config, containerMiddleware, errorMiddleware, errorHandler, loggerMiddleware }) => {
  const router = Router()
  const apiRouter = Router()

  apiRouter
    .use(loadControllers('controller/**/*Controller.js', { cwd: __dirname }))

  router
    .use(loggerMiddleware)
    .use(errorMiddleware)
    .use(containerMiddleware)
    .use(bodyParser.json())
    .use(cors())
    .use('/api', apiRouter)

  router
    .use(errorHandler)

  return router
}

module.exports[RESOLVER] = {
  name: 'router',
  lifetime: Lifetime.SINGLETON
}
