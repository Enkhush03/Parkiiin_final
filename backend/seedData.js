const fs = require('fs');
const path = require('path');

const BookingConfig = require('./models/BookingConfig');
const Parking = require('./models/Parking');
const Service = require('./models/Service');
const TipArticle = require('./models/TipArticle');
const TipVideo = require('./models/TipVideo');

const readData = (filename) => {
  const filePath = path.join(__dirname, 'data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const mapParkingData = () => {
  const data = readData('parking.json');
  return data.PARKING_SPOTS.map((spot) => {
    const marker = data.MARKER_DATA[spot.id] || {};

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
      markerLoc: marker.loc,
      lat: spot.lat || null,
      lng: spot.lng || null
    };
  });
};

const mapServiceData = () => {
  const data = readData('services.json');
  return data.services.map((service) => ({
    serviceId: service.id,
    name: service.name,
    type: service.type,
    loc: service.loc,
    price: service.price,
    rating: service.rating,
    top: service.top,
    left: service.left,
    emoji: service.emoji,
    distance: service.distance,
    time: service.time,
    tag: service.tag,
    gradient: service.gradient
  }));
};

const seedInitialData = async ({ reset = false } = {}) => {
  if (reset) {
    await Promise.all([
      Parking.deleteMany({}),
      Service.deleteMany({}),
      BookingConfig.deleteMany({}),
      TipArticle.deleteMany({}),
      TipVideo.deleteMany({})
    ]);
  }

  const shouldCreateDefaultParking = await Parking.countDocuments() === 0;
  await Parking.bulkWrite(mapParkingData().map((spot) => ({
    updateOne: {
      filter: { spotId: spot.spotId },
      update: { $set: spot },
      upsert: shouldCreateDefaultParking
    }
  })));

  const shouldCreateDefaultServices = await Service.countDocuments() === 0;
  await Service.bulkWrite(mapServiceData().map((service) => ({
    updateOne: {
      filter: { serviceId: service.serviceId },
      update: { $set: service },
      upsert: shouldCreateDefaultServices
    }
  })));

  await BookingConfig.updateOne(
    { key: 'default' },
    { $set: { key: 'default', ...readData('booking.json') } },
    { upsert: true }
  );

  const tips = readData('tips.json');
  await TipArticle.bulkWrite(tips.TipsArticles.map((article) => ({
    updateOne: {
      filter: { id: article.id },
      update: { $set: article },
      upsert: true
    }
  })));
  await TipVideo.bulkWrite(tips.TipsVideos.map((video) => ({
    updateOne: {
      filter: { id: video.id },
      update: { $set: video },
      upsert: true
    }
  })));
};

module.exports = {
  seedInitialData
};
