const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  loc: String,
  price: String,
  rating: Number,
  top: String,
  left: String,
  emoji: String,
  distance: String,
  time: String,
  tag: String,
  gradient: String
});

module.exports = mongoose.model('Service', serviceSchema);
