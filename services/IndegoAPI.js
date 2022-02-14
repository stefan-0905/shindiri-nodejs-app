const { default: axios } = require('axios');

const Bikes = Object.freeze({
  fetch: () => {
    return new Promise((resolve, reject) => {
      return axios({
        url: process.env.INDIGO_API,
        method: 'GET',
      })
        .then((response) => response.data)
        .then((bikeData) => {
          resolve(bikeData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
});

module.exports = Bikes;
