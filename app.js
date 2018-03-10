require('dotenv-safe').config()

const getLocation = require('./scripts/getLocationByIp')
const getWeather = require('./scripts/getWeatherOWM')
const saveImages = require('./scripts/getImages')
const mapToFile = require('./scripts/mapToFile')
const jsonToFile = require('./scripts/jsonToFile');

(async () => {
  try{
    const location = await getLocation()
    const weather = await getWeather(...location.coords)
    saveImages(location.city, location.country)
    mapToFile(...location.coords)
    jsonToFile(location, weather)
  } catch (e) {
    console.log(e)
  }
})()