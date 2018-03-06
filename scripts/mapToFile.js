const fs = require('fs')
const fetch = require('node-fetch')

const mapsKey = require('./mapsKey')
const urlBase = `https://maps.googleapis.com/maps/api/staticmap?scale=2&size=640x640&zoom=12`

module.exports = (lat, lon) => {
	getMap(lat, lon, 'roadmap')
	getMap(lat, lon, 'satellite')
	// getMap(lat, lon, 'terrain')
}

async function getMap (lat, lon, maptype) {
	await fetch(`${urlBase}&maptype=${maptype}&center=${lat},${lon}&key=${mapsKey}`)
		.then(async res => {
			const newDate = new Date()
			const dateString = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate()
			const dir = `./logs/${dateString}`
			if (!fs.existsSync(dir))
				await fs.mkdirSync(dir)
			res.body
			.pipe(fs.createWriteStream(`${dir}/${maptype}.png`))
				.on('close', () => console.log(`File written to ${dir}/${maptype}.png`))
		})
}
