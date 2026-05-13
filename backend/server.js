const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/parkiiin_db')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read data from JSON files
const readData = (filename) => {
    const filePath = path.join(__dirname, 'data', filename);
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
};

// --- API Endpoints ---

const Parking = require('./models/Parking');
const TipArticle = require('./models/TipArticle');
const TipVideo = require('./models/TipVideo');

// 1. Parking API
app.get('/api/parking', async (req, res) => {
    try {
        const parkingSpots = await Parking.find();
        
        const PARKING_SPOTS = parkingSpots.map(spot => ({
            id: spot.spotId,
            name: spot.name,
            loc: spot.loc,
            price: spot.price,
            slots: spot.slots,
            dist: spot.dist,
            rating: spot.rating,
            cssClass: spot.cssClass,
            badge: spot.badge
        }));

        const MARKER_DATA = {};
        parkingSpots.forEach(spot => {
            if(spot.emoji || spot.markerPrice) {
                MARKER_DATA[spot.spotId] = {
                    emoji: spot.emoji,
                    name: spot.name,
                    loc: spot.markerLoc || spot.loc,
                    price: spot.markerPrice,
                    slots: spot.markerSlots,
                    rating: spot.rating ? spot.rating.toString() : ''
                };
            }
        });

        res.json({ MARKER_DATA, PARKING_SPOTS });
    } catch (error) {
        res.status(500).json({ message: "Error reading parking data from DB", error: error.message });
    }
});

// 2. Booking API
app.get('/api/booking', (req, res) => {
    try {
        const bookingData = readData('booking.json');
        res.json(bookingData);
    } catch (error) {
        res.status(500).json({ message: "Error reading booking data", error: error.message });
    }
});

// 3. Tips API
app.get('/api/tips', async (req, res) => {
    try {
        const TipsArticles = await TipArticle.find();
        const TipsVideos = await TipVideo.find();
        res.json({ TipsArticles, TipsVideos });
    } catch (error) {
        res.status(500).json({ message: "Error reading tips data from DB", error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
