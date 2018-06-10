const mockResponseMadrid = () => {
  return {
    coord: {lon: -3.7, lat: 40.42},
    weather: [{id: 801, main: 'Clouds', description: 'few clouds', icon: '02n'}],
    base: 'stations',
    main: {temp: 290.43, pressure: 1013, humidity: 72, temp_min: 289.15, temp_max: 291.15},
    visibility: 10000,
    wind: {speed: 4.1, deg: 240},
    clouds: {all: 20},
    dt: 1528660800,
    sys: {type: 1, id: 5505, message: 0.0022, country: 'ES', sunrise: 1528605850, sunset: 1528659891},
    id: 3117735,
    name: 'Madrid',
    cod: 200
  }
}

module.exports = {
  mockResponseMadrid
}
