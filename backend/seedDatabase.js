const mongoose = require('mongoose');
require('./config/loadEnv')();
const { seedInitialData } = require('./seedData');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/parkiiin_db';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for full seed...');
    await seedInitialData({ reset: true });
    console.log('Database seeded successfully.');
    await mongoose.disconnect();
  })
  .catch(async (error) => {
    console.error('Database seed failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  });
