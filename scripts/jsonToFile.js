const fs = require('fs')

module.exports = (...args) => {
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