const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const BookingConfig = require('./models/BookingConfig');
const Order = require('./models/Order');
const Parking = require('./models/Parking');
const Service = require('./models/Service');
const TipArticle = require('./models/TipArticle');
const TipVideo = require('./models/TipVideo');
const User = require('./models/User');
const auth = require('./middleware/auth');
const { seedInitialData } = require('./seedData');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/parkiiin_db';
const JWT_SECRET = process.env.JWT_SECRET || 'parkiiin-dev-secret-change-in-production';
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('MongoDB connected');
        await seedInitialData();
        console.log('Initial database data is ready');
    })
    .catch(err => console.error('MongoDB connection failed:', err.message));

app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true
}));
app.use(express.json());

const formatParkingSpot = (spot) => ({
    id: spot.spotId,
    spotId: spot.spotId,
    name: spot.name,
    loc: spot.loc,
    price: spot.price,
    slots: spot.slots,
    dist: spot.dist,
    rating: spot.rating,
    cssClass: spot.cssClass,
    badge: spot.badge,
    top: spot.top || '50%',
    left: spot.left || '50%',
    emoji: spot.emoji || '🅿️',
    lat: spot.lat || null,
    lng: spot.lng || null
});

const formatService = (service) => ({
    id: service.serviceId,
    serviceId: service.serviceId,
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
});

const formatPrice = (price) => {
    if (typeof price !== 'number') return price || '';
    return `${price.toLocaleString('mn-MN')}₮`;
};

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// Parking API
app.get('/api/parking', async (req, res) => {
    try {
        const parkingSpots = await Parking.find().sort({ spotId: 1 }).lean();
        const PARKING_SPOTS = parkingSpots.map(formatParkingSpot);

        const MARKER_DATA = {};
        parkingSpots.forEach(spot => {
            if (spot.emoji || spot.markerPrice) {
                MARKER_DATA[spot.spotId] = {
                    emoji: spot.emoji,
                    name: spot.name,
                    loc: spot.markerLoc || spot.loc,
                    price: spot.markerPrice || formatPrice(spot.price),
                    slots: spot.markerSlots || `${spot.slots} зогсоол`,
                    rating: spot.rating ? spot.rating.toString() : '',
                    top: spot.top || '50%',
                    left: spot.left || '50%'
                };
            }
        });

        res.json({ MARKER_DATA, PARKING_SPOTS });
    } catch (error) {
        res.status(500).json({ message: 'Error reading parking data from DB', error: error.message });
    }
});

app.get('/api/parking/:spotId', async (req, res) => {
    try {
        const spot = await Parking.findOne({ spotId: req.params.spotId }).lean();
        if (!spot) return res.status(404).json({ message: 'Parking spot not found' });
        res.json(formatParkingSpot(spot));
    } catch (error) {
        res.status(500).json({ message: 'Error reading parking spot from DB', error: error.message });
    }
});

app.post('/api/parking', auth, async (req, res) => {
    try {
        const payload = {
            ...req.body,
            spotId: req.body.spotId || req.body.id,
            price: Number(req.body.price),
            slots: Number(req.body.slots),
            dist: Number(req.body.dist ?? 1),
            rating: Number(req.body.rating ?? 5),
            badge: req.body.badge || `${req.body.slots} зогсоол`,
            top: req.body.top || '50%',
            left: req.body.left || '50%',
            markerPrice: req.body.markerPrice || formatPrice(Number(req.body.price)),
            markerSlots: req.body.markerSlots || `${req.body.slots} зогсоол`,
            markerLoc: req.body.markerLoc || req.body.loc,
            lat: req.body.lat ? Number(req.body.lat) : null,
            lng: req.body.lng ? Number(req.body.lng) : null
        };

        const newSpot = new Parking(payload);
        const savedSpot = await newSpot.save();
        res.status(201).json(formatParkingSpot(savedSpot));
    } catch (error) {
        res.status(400).json({ message: 'Error creating parking spot', error: error.message });
    }
});

app.delete('/api/parking/:spotId', auth, async (req, res) => {
    try {
        const result = await Parking.findOneAndDelete({ spotId: req.params.spotId });
        if (!result) return res.status(404).json({ message: 'Parking spot not found' });
        res.json({ message: 'Parking spot deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting parking spot', error: error.message });
    }
});

// Booking API
app.get('/api/booking', async (req, res) => {
    try {
        const bookingData = await BookingConfig.findOne({ key: 'default' }).lean();
        if (!bookingData) return res.status(404).json({ message: 'Booking config not found' });
        const { _id, __v, key, ...config } = bookingData;
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: 'Error reading booking data from DB', error: error.message });
    }
});

// Services API
app.get('/api/services', async (req, res) => {
    try {
        const filter = req.query.type ? { type: req.query.type } : {};
        const services = await Service.find(filter).sort({ serviceId: 1 }).lean();
        res.json({ services: services.map(formatService) });
    } catch (error) {
        res.status(500).json({ message: 'Error reading services from DB', error: error.message });
    }
});

app.post('/api/services', auth, async (req, res) => {
    try {
        const service = new Service({
            ...req.body,
            serviceId: req.body.serviceId || req.body.id,
            rating: req.body.rating ? Number(req.body.rating) : undefined
        });
        const savedService = await service.save();
        res.status(201).json(formatService(savedService));
    } catch (error) {
        res.status(400).json({ message: 'Error creating service', error: error.message });
    }
});

app.delete('/api/services/:serviceId', auth, async (req, res) => {
    try {
        const result = await Service.findOneAndDelete({ serviceId: req.params.serviceId });
        if (!result) return res.status(404).json({ message: 'Service not found' });
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error: error.message });
    }
});

app.get('/api/services/:type', async (req, res) => {
    try {
        const services = await Service.find({ type: req.params.type }).sort({ serviceId: 1 }).lean();
        res.json({ services: services.map(formatService) });
    } catch (error) {
        res.status(500).json({ message: 'Error reading services from DB', error: error.message });
    }
});

// Tips API
app.get('/api/tips', async (req, res) => {
    try {
        const TipsArticles = await TipArticle.find().lean();
        const TipsVideos = await TipVideo.find().lean();
        res.json({ TipsArticles, TipsVideos });
    } catch (error) {
        res.status(500).json({ message: 'Error reading tips data from DB', error: error.message });
    }
});

app.post('/api/tips/article', auth, async (req, res) => {
    try {
        const article = new TipArticle(req.body);
        const savedArticle = await article.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(400).json({ message: 'Error creating article', error: error.message });
    }
});

app.delete('/api/tips/article/:id', auth, async (req, res) => {
    try {
        const result = await TipArticle.findOneAndDelete({ id: req.params.id });
        if (!result) return res.status(404).json({ message: 'Article not found' });
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error: error.message });
    }
});

app.post('/api/tips/video', auth, async (req, res) => {
    try {
        const video = new TipVideo(req.body);
        const savedVideo = await video.save();
        res.status(201).json(savedVideo);
    } catch (error) {
        res.status(400).json({ message: 'Error creating video', error: error.message });
    }
});

app.delete('/api/tips/video/:id', auth, async (req, res) => {
    try {
        const result = await TipVideo.findOneAndDelete({ id: req.params.id });
        if (!result) return res.status(404).json({ message: 'Video not found' });
        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting video', error: error.message });
    }
});

// Auth and User API
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Бүх талбарыг бөглөнө үү.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'И-мэйл бүртгэлтэй байна.' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword, vehicles: [], points: 0 });
        await newUser.save();

        const token = generateToken(newUser);
        res.status(201).json({ token, id: newUser._id, name: newUser.name, email: newUser.email, vehicles: [], points: 0 });
    } catch (error) {
        res.status(500).json({ message: 'Бүртгэхэд алдаа гарлаа.', error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'И-мэйл болон нууц үгээ оруулна уу.' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'И-мэйл эсвэл нууц үг буруу байна.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'И-мэйл эсвэл нууц үг буруу байна.' });

        const token = generateToken(user);
        res.json({ token, id: user._id, name: user.name, email: user.email, vehicles: user.vehicles, points: user.points });
    } catch (error) {
        res.status(500).json({ message: 'Нэвтрэхэд алдаа гарлаа.', error: error.message });
    }
});

app.get('/api/users/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй.' });
        res.json({ id: user._id, name: user.name, email: user.email, vehicles: user.vehicles, points: user.points });
    } catch (error) {
        res.status(500).json({ message: 'Алдаа гарлаа.', error: error.message });
    }
});

app.post('/api/users/:id/vehicles', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй.' });
        user.vehicles.push(req.body);
        await user.save();
        res.status(201).json(user.vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Машин нэмэхэд алдаа гарлаа.', error: error.message });
    }
});

app.delete('/api/users/:id/vehicles/:plateId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй.' });
        user.vehicles = user.vehicles.filter(v => v._id.toString() !== req.params.plateId);
        await user.save();
        res.json(user.vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Машин устгахад алдаа гарлаа.', error: error.message });
    }
});

// Orders API
app.post('/api/orders', auth, async (req, res) => {
    try {
        const { type, name, loc, price, hour, payment, vehicle } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй.' });

        const newOrder = new Order({
            userId,
            userName: user.name,
            type: type || 'parking',
            name,
            loc: loc || '',
            price: Number(price),
            hour: hour ? Number(hour) : null,
            payment: payment || 'qpay',
            vehicle: vehicle || {},
            status: 'active'
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: 'Захиалга хадгалахад алдаа гарлаа.', error: error.message });
    }
});

app.get('/api/orders/user/:userId', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.userId) {
            return res.status(403).json({ message: 'Зөвшөөрөл байхгүй.' });
        }

        const orders = await Order.find({ userId: req.params.userId })
            .sort({ createdAt: -1 })
            .lean();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Захиалгын түүх авахад алдаа гарлаа.', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
