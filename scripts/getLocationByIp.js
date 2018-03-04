const geoip = require('geoip-lite')
const fetch = require('node-fetch')

module.exports = async () => {
  const { ll: coords, city, country } = await getLocation()
  return {coords, city, country}
}

async function getLocation () {
  return await fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(({ ip }) => {
      return geoip.lookup(ip)
    })
}
