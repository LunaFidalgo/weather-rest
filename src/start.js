const container = require('./container')

const app = container.resolve('app')

app
  .start()
  .then(() => {
    app.logger.info(`Service ${app.config.serviceName} started`)
  })
  .catch((err) => {
    app.stop()
    app.logger.error(err.stack)
    process.exit()
  })
