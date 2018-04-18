const fs = require('fs')
const fetch = require('node-fetch')

const urlBase = `https://maps.googleapis.com/maps/api/staticmap?scale=2&size=640x640&zoom=12&key=${process.env.GOOGLE}`

module.exports = (lat, lon, dir) => {
	getMap(lat, lon, 'roadmap', dir)
	getMap(lat, lon, 'satellite', dir)
	// getMap(lat, lon, 'terrain')
}

async function getMap (lat, lon, maptype, dir) {
	await fetch(`${urlBase}&maptype=${maptype}&center=${lat},${lon}`)
		.then(async res => {
			const newDate = new Date()

			const path = `${dir}/${maptype}.png`
			res.body
				.pipe(fs.createWriteStream(path))
				.on('close', () => console.log(`Map written to ${path}`))
		})
}
