require('dotenv-safe').config()
const fs = require('fs')

const getLocation = require('./scripts/getLocationByIp')
const getWeather = require('./scripts/getWeatherOWM')
const saveImages = require('./scripts/getImages')
const mapToFile = require('./scripts/mapToFile')
const jsonToFile = require('./scripts/jsonToFile');

(async () => {
  try{

    const location = await getLocation()
    const weather = await getWeather(...location.coords)

    location.neighborhood = weather.neighborhood
    delete weather.neighborhood

    const newDate = new Date()
    const dateString = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
    const dateDir = `./logs/${dateString}`
    if (!fs.existsSync(dateDir))
      await fs.mkdirSync(dateDir)
    const imageDir = `${dateDir}/${location.neighborhood}, ${location.city}, ${location.country}`
    if (!fs.existsSync(imageDir))
      await fs.mkdirSync(imageDir)

    saveImages(location.city, location.country, location.neighborhood, imageDir)
    mapToFile(...location.coords, imageDir)
    jsonToFile(location, weather, dateDir)
  } catch (e) {
    console.log(e)
  }
})()