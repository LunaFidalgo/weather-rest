const container = require('./container')

const app = container.resolve('app')

app
  .start()
  .then(() => {
    app.logger.info(`Service ${app.config.serviceName} started`)
    app.stop()
  })
  .catch((err) => {
    app.logger.error(error.stack)
    process.exit()
  })
