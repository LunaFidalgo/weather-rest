const mockData = require('../../../client/__tests__/__mocks__/mock_data')

const weatherClient = {
  async getWeatherInfo () {
    return mockData.mockResponseMadrid()
  }
}

module.exports = weatherClient
