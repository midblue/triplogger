const fs = require('fs')
const got = require('got')

const numberOfPhotos = 9

const urlBase = `https://www.googleapis.com/customsearch/v1?imgSize=large&imgType=photo&num=${numberOfPhotos}&searchType=image&key=${process.env.GOOGLE}&cx=${process.env.GSEARCH}`

module.exports = async (locationName, countryName) => {
  try {
    const newDate = new Date()
    const dateString = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
    const dir = `./logs/${dateString}`
    if (!fs.existsSync(dir))
      await fs.mkdirSync(dir)

    const searchResponse = await got(`${urlBase}&q=${locationName}`)//%20${countryName}`)
    JSON.parse(searchResponse.body).items
      .map(({ link }, index) => {
        const fileType = link.indexOf('jpg') ? 'jpg'
          : link.indexOf('png') ? 'png'
          : link.indexOf('gif') ? 'gif'
          : link.indexOf('jpeg') ? 'jpeg'
          : 'other'
        if (!fileType) return console.log('Err: no file type found for', link)
        const fileName = `${dir}/${newDate.getHours()}-${locationName}-${index}.${fileType}`
        got.stream(link)
          .pipe(fs.createWriteStream(fileName))
          .on('close', () => console.log(`Image written to ${fileName}`))
      })
  } catch (e) {
    console.log('getImages', e.response.body)
  }
}
