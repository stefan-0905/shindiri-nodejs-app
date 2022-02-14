const IndegoAPI = require('../services/IndegoAPI');
const WeatherAPI = require('../services/WeatherAPI');
const STATION = require('../models/Station');
const WEATHER = require('../models/Weather');

const IndegoAPITask = () => {
  Promise.all([WeatherAPI.fetch(), IndegoAPI.fetch()])
    .then((data) => {
      //Making current date so it will be the same for each object 
      const now = new Date();

      const stations = data[1].features.map((feature) => ({ ...feature, created_at: now }))
      STATION.insertMany(stations);
      WEATHER.create({ ...data[0], created_at: now });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = IndegoAPITask;
