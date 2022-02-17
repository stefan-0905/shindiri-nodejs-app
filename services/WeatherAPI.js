const { default: axios } = require('axios');

const featchWeatherData = async () => {
  const API = process.env.OPEN_WEATHER_KEY;
  const lat = process.env.PHILADELPHIA_LATITUDE;
  const lon = process.env.PHILADELPHIA_LONGITUDE;

  const response = await axios({
    url: `${process.env.OPEN_WEATHER_API}?lat=${lat}&lon=${lon}&appid=${API}`,
    method: 'GET',
  });

  return response.data;
};

module.exports = featchWeatherData;
