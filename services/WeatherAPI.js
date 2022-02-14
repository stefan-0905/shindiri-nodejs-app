const { default: axios } = require('axios');

const WeatherAPI = Object.freeze({
  fetch: () => {
    return new Promise((resolve, reject) => {

      const API = process.env.OPEN_WEATHER_KEY;
      const lat = process.env.PHILADELPHIA_LATITUDE;
      const lon = process.env.PHILADELPHIA_LONGITUDE;

      axios({
        url: `${process.env.OPEN_WEATHER_API}?lat=${lat}&lon=${lon}&appid=${API}`,
        method: 'GET',
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error.message);
          reject(error);
        });
    });
  },
});

module.exports = WeatherAPI;
