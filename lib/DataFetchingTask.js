const STATION = require('../models/Station');
const WEATHER = require('../models/Weather');
const featchWeatherData = require('../services/WeatherAPI');
const fetchBikesData = require('../services/IndegoAPI');

const dataFetchingTask = async () => {
  try {
    const data = await Promise.all([featchWeatherData(), fetchBikesData()]);
    console.log('Saving data');
    //Making current date so it will be the same for each object
    const now = new Date();

    const stations = data[1].features.map((feature) => ({ ...feature, created_at: now }));
    await STATION.insertMany(stations);
    await WEATHER.create({ ...data[0], created_at: now });

    console.log('Done');
  } catch (error) {
    console.log(error.message);
    console.log('There has been an error with saving bikes and weather data');
  }
};

module.exports = dataFetchingTask;
