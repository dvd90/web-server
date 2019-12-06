const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/fee2f5ff80b034a74097e1184c866e7d/${latitude},${longitude}?units=si`;
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It's currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
        }
    })
}

module.exports = forecast;