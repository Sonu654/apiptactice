const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyBYCiYVIdYIz5XO4-gOZvUS3hto0jSEj7Y",
  Promise: Promise
});
export const estimateArrivalTime = (req, res) => {
  let { source, destination, unit, region, transit_mode, mode } = req.body;
  googleMapsClient
    .distanceMatrix({
      origins: `${source.latitude},${source.longitude}`,
      destinations: `${destination.latitude},${destination.longitude}`,
      language: "en",
      units: unit || "metric",
      region: region || "in",
      transit_mode: transit_mode || "subway",
      mode: mode || "driving"
    })
    .asPromise()
    .then(expectOK => expectOK)
    .then(
      response => {
        console.log("done===>", response);
        let data = {
          destination_addresses: response.json.destination_addresses[0],
          origin_addresses: response.json.origin_addresses[0],
          distance: response.json.rows[0].elements[0].distance.text,
          duration: response.json.rows[0].elements[0].duration.text
        };
        console.log("data===>", data);
        res.json({
          success: true,
          data
        });
      },
      fail => {
        console.log("falis===>", fail);
        res.json({
          success: false,
          data: fail
        });
      }
    );
};
