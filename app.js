const request = require("request");
//var cooridinates;
var placeName = "chennai";
//const url =
//"https://api.darksky.net/forecast/6e9a671c783df23560afe2aef1c87f76/37.8267,-122.4233?units=si";
var url = "https://api.darksky.net/forecast/6e9a671c783df23560afe2aef1c87f76/";

const place_search_url =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
  placeName +
  ".json?access_token=pk.eyJ1IjoiYWRpdHlha3VtYXItY29kZXMiLCJhIjoiY2s1emhqc3VuMnJ1NDNkbjVyejJrcDZvdSJ9.NVoqWRTtSMxOn3FZNbhAlw&limit=1";

//******Geocoding request */

request({ url: place_search_url, json: true }, (error, response) => {
  if (!!error) {
    console.log("there's been eroors " + error);
  } else if (response.body.features.length == 0) {
    console.log("iNVALID PLACE");
  } else {
    const data = response.body.features[0].center;
    console.log(data[1].toFixed(4) + "," + data[0].toFixed(4));
    var coordinates = data[1].toFixed(4) + "," + data[0].toFixed(4);
    console.log(coordinates);
    url = url + coordinates + "?units=si";
  }
});

///***** Getting the weather */

request({ url: url, json: true }, (error, response) => {
  if (error) {
    console.log("Tyler the error");
  } else if (response.body.error) {
    console.log(url); // when I copy this from the teminal and paste it on the browsser, it works perfectly
    console.log(response.body.error);
  } else {
    const data = response.body;
    console.log(
      response.body.daily.data[0].summary +
        " it is currently " +
        data.currently.temperature +
        " degrees out there. There is a " +
        parseFloat(data.currently.precipProbability) * 100 +
        "% chance of rain"
    );
  }
});
