const fs = require('fs')
const got = require('got')

const urlBase = `https://www.googleapis.com/customsearch/v1?imgSize=large&imgType=photo&searchType=image&key=${process.env.GOOGLE}&cx=${process.env.GSEARCH}`

module.exports = async (cityName, countryName, neighborhoodName, dir) => {

  getXImagesOf(`${cityName} ${countryName}`, 5, dir)
  getXImagesOf(`${cityName}`, 5, dir)
  getXImagesOf(`${cityName} ${neighborhoodName}`, 5, dir)
  
}

async function getXImagesOf(query, numberOfImages, dir) {
  try {
    const uri = encodeURI(query)

    const searchResponse = await got(`${urlBase}&q=${uri}&num=${numberOfImages}`)
    JSON.parse(searchResponse.body).items
      .map(({ link }, index) => {
        const fileType = link.indexOf('jpg') ? 'jpg'
          : link.indexOf('png') ? 'png'
            : link.indexOf('gif') ? 'gif'
              : link.indexOf('jpeg') ? 'jpeg'
                : 'other'
        if (!fileType) return console.log('Err: no file type found for', link)
        const fileName = `${dir}/${query} ${index}.${fileType}`
        got.stream(link)
          .pipe(fs.createWriteStream(fileName))
          .on('close', () => console.log(`Image written to ${fileName}`))
      })
  } catch (e) {
    console.log('getImages', e.response.body)
  }
}
