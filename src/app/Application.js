const { Lifetime, RESOLVER } = require('awilix')

class Application {
  constructor ({ config, server, logger, eventBus, schemasLoader, eventHandlers }) {
    this.server = server
    this.logger = logger
    this.config = config
  }

  async start () {
    /* istanbul ignore next */
    process.on('unhandledRejection', reason => {
      this.logger.error('unhandledRejection', reason)
      throw new Error(reason)
    })

    return this.server.start()
  }

  async stop () {
    return Promise.all([
      this.server.stop()
    ])
  }
}

module.exports = Application

module.exports[RESOLVER] = {
  name: 'app',
  lifetime: Lifetime.SINGLETON
}
