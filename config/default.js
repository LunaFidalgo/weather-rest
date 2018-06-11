module.exports = {
  serviceName: 'weather-service',
  server: {
    port: 5100,
    timeout: 5000
  },
  logger: {
    level: 'info',
    format: 'json'
  },
  weather: {
    apiEndpoint: '<ENV>',
    apiKey: '<ENV>'
  }
}
