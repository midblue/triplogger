const getLocation = require('./scripts/getLocationByIp')
const getWeather = require('./scripts/getWeatherOWM')
const mapToFile = require('./scripts/mapToFile')
const jsonToFile = require('./scripts/jsonToFile');

(async () => {
  try{
    const location = await getLocation()
    const weather = await getWeather(...location.coords)
    mapToFile(...location.coords)
    jsonToFile(location, weather)
  } catch (e) {
    console.log(e)
  }
})()