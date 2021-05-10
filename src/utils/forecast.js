const request = require('request')

const foreCast = (lat, lon, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=7a82ad6144ed8b356f40cf1690712fda`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.message) {
            callback('Unable to find', undefined)
        } else {
            callback(undefined, {
                temp: body.main.temp,
                wind: body.wind.speed,
                message: 'Have a nice day ahead'
            })
        }
    })
}

module.exports = foreCast