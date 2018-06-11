const { RESOLVER, Lifetime } = require('awilix')

const Operation = require('../Operation')

class GetWeather extends Operation {
  constructor ({ weatherRepository }) {
    super()

    this.repo = weatherRepository
  }

  async execute () {
    const { SUCCESS, ERROR } = this.outputs

    try {
      const data = await this.repo.getInfoWeather()
      this.emit(SUCCESS, data)
    } catch (err) {
      this.emit(ERROR, err)
    }
  }
}

GetWeather.setOutputs(['SUCCESS', 'ERROR'])

module.exports = GetWeather

module.exports[RESOLVER] = {
  name: 'getWeather',
  lifetime: Lifetime.SCOPED
}
