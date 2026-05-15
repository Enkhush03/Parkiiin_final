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



app.use(cors());
app.use(express.json());

const readData = (filename) => {
    const filePath = path.join(__dirname, 'data', filename);
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
};


const Parking = require('./models/Parking');
const TipArticle = require('./models/TipArticle');
const TipVideo = require('./models/TipVideo');


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
            if (spot.emoji || spot.markerPrice) {
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


app.post('/api/parking', async (req, res) => {
    try {
        const newSpot = new Parking(req.body);
        const savedSpot = await newSpot.save();
        res.status(201).json(savedSpot);
    } catch (error) {
        res.status(400).json({ message: "Error creating parking spot", error: error.message });
    }
});


app.delete('/api/parking/:spotId', async (req, res) => {
    try {
        const result = await Parking.findOneAndDelete({ spotId: req.params.spotId });
        if (!result) {
            return res.status(404).json({ message: "Parking spot not found" });
        }
        res.json({ message: "Parking spot deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting parking spot", error: error.message });
    }
});


app.get('/api/booking', (req, res) => {
    try {
        const bookingData = readData('booking.json');
        res.json(bookingData);
    } catch (error) {
        res.status(500).json({ message: "Error reading booking data", error: error.message });
    }
});


app.get('/api/tips', async (req, res) => {
    try {
        const TipsArticles = await TipArticle.find();
        const TipsVideos = await TipVideo.find();
        res.json({ TipsArticles, TipsVideos });
    } catch (error) {
        res.status(500).json({ message: "Error reading tips data from DB", error: error.message });
    }
});


const User = require('./models/User');


app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Basic check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "И-мэйл бүртгэлтэй байна." });

        const newUser = new User({ name, email, password, vehicles: [], points: 0 });
        await newUser.save();
        res.status(201).json({ id: newUser._id, name: newUser.name, email: newUser.email });
    } catch (error) {
        res.status(500).json({ message: "Бүртгэхэд алдаа гарлаа.", error: error.message });
    }
});


app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.status(401).json({ message: "И-мэйл эсвэл нууц үг буруу байна." });

        res.json({ id: user._id, name: user.name, email: user.email, vehicles: user.vehicles, points: user.points });
    } catch (error) {
        res.status(500).json({ message: "Нэвтрэхэд алдаа гарлаа.", error: error.message });
    }
});


app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });
        res.json({ id: user._id, name: user.name, email: user.email, vehicles: user.vehicles, points: user.points });
    } catch (error) {
        res.status(500).json({ message: "Алдаа гарлаа.", error: error.message });
    }
});


app.post('/api/users/:id/vehicles', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });

        user.vehicles.push(req.body);
        await user.save();
        res.status(201).json(user.vehicles);
    } catch (error) {
        res.status(500).json({ message: "Машин нэмэхэд алдаа гарлаа.", error: error.message });
    }
});


app.delete('/api/users/:id/vehicles/:plateId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });

        user.vehicles = user.vehicles.filter(v => v._id.toString() !== req.params.plateId);
        await user.save();
        res.json(user.vehicles);
    } catch (error) {
        res.status(500).json({ message: "Машин устгахад алдаа гарлаа.", error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
