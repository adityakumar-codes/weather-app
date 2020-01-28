const request = require("request");

const url =
  "https://api.darksky.net/forecast/6e9a671c783df23560afe2aef1c87f76/37.8267,-122.4233?units=si";

request({ url: url, json: true }, (error, response) => {
  const data = response.body;
  if (error) {
    console.log("Tyler the error");
  } else {
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
