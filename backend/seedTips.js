const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const TipArticle = require('./models/TipArticle');
const TipVideo = require('./models/TipVideo');

mongoose.connect('mongodb://localhost:27017/parkiiin_db')
  .then(async () => {
    console.log('MongoDB connected');

    const raw = fs.readFileSync(path.join(__dirname, 'data', 'tips.json'));
    const data = JSON.parse(raw);

    await TipArticle.deleteMany({});
    await TipVideo.deleteMany({});

    await TipArticle.insertMany(data.TipsArticles);
    await TipVideo.insertMany(data.TipsVideos);

    console.log('Tips seed хийгдлээ');
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });
