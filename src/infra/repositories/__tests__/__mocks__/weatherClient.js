const mockData = require('../../../client/__tests__/__mocks__/mock_data')

const weatherClient = {
  async getWeather () {
    return mockData.mockResponseMadrid()
  }
}

module.exports = weatherClient
