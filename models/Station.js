const mongoose = require('mongoose');

const StationSchema = mongoose.Schema({
  geometry: { type: Object },
  properties: { type: Object },
  type: { type: String },
  created_at: { type: Date, default: new Date(), index: true },
});

module.exports = mongoose.model('Station', StationSchema);
