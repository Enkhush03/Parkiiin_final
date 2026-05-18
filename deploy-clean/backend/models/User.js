const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  model: { type: String, required: true },
  plate: { type: String, required: true },
  emoji: { type: String, default: '🚗' }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vehicles: [vehicleSchema],
  points: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
