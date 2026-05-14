const mongoose = require('mongoose');

const tipVideoSchema = new mongoose.Schema({
  id:       { type: String, required: true, unique: true },
  label:    String,
  duration: String,
  gradient: String,
  featured: { type: Boolean, default: false },
});

module.exports = mongoose.model('TipVideo', tipVideoSchema);
