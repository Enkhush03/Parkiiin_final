const mongoose = require('mongoose');

const bookingConfigSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: 'default' },
  Booking: {
    Price_per_hour: Number,
    Bonus: Number
  },
  HourOptions: [mongoose.Schema.Types.Mixed],
  PaymentMethod: [mongoose.Schema.Types.Mixed]
});

module.exports = mongoose.model('BookingConfig', bookingConfigSchema);
