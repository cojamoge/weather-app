const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1ec7db6649b0a9e6adea90b100fc67db&query=' + longitude + ',' + latitude + ''

    request({ url, json: true }, (error, {body} = {}) =>{
        if (error) {
            callback('unable to connect to service')
        } else if (body.error) {
            callback('Unable to find location based on coordinates provided.')
        } else {
            callback(undefined, 'In ' + body.location.name + ' it is ' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + '.')
        }
    } )
}

module.exports = forecast