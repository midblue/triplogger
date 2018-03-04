const fetch = require('node-fetch')

const apiURL = require('./OWMKey.js')
const apiKey = '84f4890e9ce63df74692b55c2224f330'

module.exports = async (lat, lon) => {
  return await fetch(`${apiURL}?lat=${lat}&lon=${lon}&APPID=${apiKey}`)
    .then(res => res.json())
    .then(json => ({ 
      weather: json.weather[0].main, 
      temp: kelvinToFahrenheit(json.main.temp),
      humidity: json.main.humidity,
      high: kelvinToFahrenheit(json.main.temp_max),
      low: kelvinToFahrenheit(json.main.temp_min),
    }))
}

function kelvinToFahrenheit (kel) {
  return parseInt((1.8 * (kel - 273)) + 32)
}