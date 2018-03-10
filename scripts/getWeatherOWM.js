const fetch = require('node-fetch')

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?APPID=${process.env.OWM}`

module.exports = async (lat, lon) => {
  return await fetch(`${apiUrl}&lat=${lat}&lon=${lon}`)
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