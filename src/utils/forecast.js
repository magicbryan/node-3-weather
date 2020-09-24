const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=89b44b63499a293389dc0c93af374201&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=f'
    request({ url, json: true }, (error, {body}={}) => {

        if (error) {
            callback('Error connecting to weather service', undefined)
        } else if (body.error) {
            callback('Cannot find location', undefined)
        } else {
           callback(undefined, ( `${body.current.weather_descriptions[0]} - It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} though. Humidity is ${body.current.humidity}%`))
            
        }
    })
}

module.exports = forecast