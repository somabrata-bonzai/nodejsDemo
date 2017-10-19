var googleAPI = require("@google/maps");

var key = "AIzaSyDuRfdjYbMZ9GYaoU81MvzLpau2129syLM";

module.exports = (function() {
    var geocodeService = {};

    geocodeService.getLatLng = function(payload, callback) {
        var googleMapsClient = googleAPI.createClient({
            key: payload.key || key,
        });
        googleMapsClient.geocode(
            {
                address: payload.address,
            },
            function(err, response) {
                callback(err, response.json.results);
            }
        );
    };

    return geocodeService;
})();
