const { RESOLVER, Lifetime } = require('awilix')
const http = require('http')
const express = require('express')
const terminus = require('@godaddy/terminus')

const onHealthCheck = () => {
  return Promise.resolve()
}

class Server {
  constructor ({ config, logger, router }) {
    this.config = config
    this.logger = logger

    this.app = express()
    this.app.disable('x-powered-by')
    this.app.use(router)

    this.server = terminus(http.createServer(this.app), {
      timeout: config.server.timeout,
      signal: 'SIGINT',

      healthChecks: {
        '/_health/liveness': onHealthCheck(),
        '/_health/readiness': onHealthCheck()
      },
      logger: this.logger.info
    })
  }

  async start () {
    return new Promise((resolve) => {
      this.server.listen(this.config.server.port, () => {
        this.logger.info(`[p ${process.pid}] Listening at port ${this.config.server.port}`)
        resolve()
      })
    })
  }

  async stop () {
    return this.server.close()
  }
}

module.exports = Server
module.exports[RESOLVER] = {
  name: 'server',
  lifetime: Lifetime.SINGLETON
}
