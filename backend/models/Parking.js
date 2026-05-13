const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
  spotId: { type: String, required: true, unique: true },
  name: String,
  loc: String,
  price: Number,
  slots: Number,
  dist: Number,
  rating: Number,
  cssClass: String,
  badge: String,
  // MARKER_DATA values
  emoji: String,
  markerPrice: String,
  markerSlots: String,
  markerLoc: String
});

module.exports = mongoose.model('Parking', parkingSchema);
