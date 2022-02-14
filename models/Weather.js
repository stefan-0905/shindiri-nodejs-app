const mongoose = require('mongoose');

const WeatherSchema = mongoose.Schema({
  coord: { type: Object },
  weather: { type: Array },
  main: { type: Object },
  wind: { type: Object },
  clouds: { type: Object },
  Sys: { type: Object },
  base: { type: String },
  name: { type: String },
  visibility: { type: Number },
  dt: { type: Number },
  timezone: { type: Number },
  cod: { type: Number },
  //We can also index id as well. But in our case it will always be the same as we are getting only one weather region 
  id: { type: Number },
  created_at: { type: Date, default: new Date(), index: true },
});

module.exports = mongoose.model('Weather', WeatherSchema);
