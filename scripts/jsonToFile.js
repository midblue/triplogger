const fs = require('fs')

module.exports = async (location, weather, dir) => {
  fs.writeFile(
    `${dir}/${new Date().getHours()}.txt`,
    JSON.stringify({
      date: new Date(),
      location,
      weather,
		}), 
    (err) => {
      if (err) return console.log('Already have a file for this date!')
      console.log(`File written to ${dir}/${new Date().getHours()}.txt`)
    }
  )
}
