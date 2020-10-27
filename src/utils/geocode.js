const request = require('request')

const geocode = (address, callback) => {
    const dataUndefined = {
        latitude: undefined,
        longitude: undefined,
        location: undefined
    }
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaHV1ZHVuZyIsImEiOiJja2dxOXExNG4wNDZ0MnJrOHoxbTBiY256In0.V0cGmJ2wgWcwhRirlUrLoA&limit=1'
    request({
        url,
        json: true
    }, (error, {body}) => {
        console.log(body.features);
        if (error) {
            callback('Unable to connect to location services!', dataUndefined)
        } else if (body.features.length == 0) {
            callback('Unable to find location. Try another search.', dataUndefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode