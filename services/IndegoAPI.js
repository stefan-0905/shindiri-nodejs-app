const { default: axios } = require('axios');

const fetchBikesData = async () => {
  const response = await axios({
    url: process.env.INDIGO_API,
    method: 'GET',
  });

  return response.data;
};

module.exports = fetchBikesData;
