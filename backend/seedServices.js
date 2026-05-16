const mongoose = require('mongoose');
const Service = require('./models/Service');
const data = require('./data/services.json');

mongoose.connect('mongodb://localhost:27017/parkiiin_db')
  .then(async () => {
    console.log('MongoDB connected');
    for (const s of data.services) {
      await Service.findOneAndUpdate(
        { serviceId: s.id },
        { ...s, serviceId: s.id },
        { upsert: true, new: true }
      );
      console.log('Seeded:', s.name);
    }
    console.log('Done!');
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });
