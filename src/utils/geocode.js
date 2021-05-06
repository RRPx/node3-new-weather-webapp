const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoicmlkd2FudXIiLCJhIjoiY2tpN3Y3dXYzMDJiNjJ4bDJieXk2N2NpNSJ9.wpSyVzrDiIGTND56sxKucQ'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.message) {
            callback('Unable to find', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].text
            })
        }
    })
}

module.exports = geoCode