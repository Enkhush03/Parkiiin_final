const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

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

// 1. Parking API
app.get('/api/parking', (req, res) => {
    try {
        const parkingData = readData('parking.json');
        res.json(parkingData);
    } catch (error) {
        res.status(500).json({ message: "Error reading parking data", error: error.message });
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
app.get('/api/tips', (req, res) => {
    try {
        const tipsData = readData('tips.json');
        res.json(tipsData);
    } catch (error) {
        res.status(500).json({ message: "Error reading tips data", error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
