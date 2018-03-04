const fs = require('fs')
const getLocation = require('./scripts/getLocationByIp')
const getWeather = require('./scripts/getWeatherOWM');

(async () => {
  const location = await getLocation()
  const weather = await getWeather(...location.coords)
  exportData(location, weather)
})()

function exportData (...args) {
  const newDate = new Date()
  const dateString = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
  fs.writeFile(
    `./logs/${dateString}.json`,
    JSON.stringify(args), 
    (err) => {
      if (err) return console.log('Already have a file for this date!')
      console.log(`File written to logs/${dateString}.json`)
    }
  )
}