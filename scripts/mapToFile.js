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
		.then(res => res.body
			.pipe(fs.createWriteStream(`./logs/${maptype}.png`))
			.on('close', () => console.log(`File written to logs/${maptype}.png`))
		)
}
