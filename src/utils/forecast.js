const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/13c00fa190d682da04d76c62254e6cf1/' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // console.log(body.daily.data[0])   // use this to print other data we could grab
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '.')
        }
    }) 
}

module.exports = forecast;