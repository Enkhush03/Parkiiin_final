const mongoose = require('mongoose');
const Parking = require('./models/Parking');
const fs = require('fs');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/parkiiin_db')
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    
    // Одоо байгаа өгөгдлийг арилгах
    await Parking.deleteMany({});
    console.log('Cleared existing parking data.');

    // JSON унших
    const dataPath = path.join(__dirname, 'data', 'parking.json');
    const rawData = fs.readFileSync(dataPath);
    const jsonData = JSON.parse(rawData);

    const spots = jsonData.PARKING_SPOTS;
    const markers = jsonData.MARKER_DATA;

    // MongoDB-д зориулсан өгөгдлийг нэгтгэж форматлах
    const seedData = spots.map(spot => {
      const marker = markers[spot.id] || {};
      return {
        spotId: spot.id,
        name: spot.name,
        loc: spot.loc,
        price: spot.price,
        slots: spot.slots,
        dist: spot.dist,
        rating: spot.rating,
        cssClass: spot.cssClass,
        badge: spot.badge,
        top: spot.top,
        left: spot.left,
        emoji: spot.emoji || marker.emoji,
        markerPrice: marker.price,
        markerSlots: marker.slots,
        markerLoc: marker.loc
      };
    });

    // DB-д оруулах
    await Parking.insertMany(seedData);
    console.log('Seeded Parking data successfully!');
    
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    mongoose.disconnect();
  });
