// const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=b08bd4c6d1d84ad090bee3f82821883a`

const axios = require('axios').default
const http = require('http')
const encodeurl = require('encodeurl')



// getGEOs function here

module.exports = {
    getGEOs : getGEOs
}