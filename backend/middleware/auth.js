const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'parkiiin-dev-secret-change-in-production';

/**
 * JWT Authentication Middleware
 * Authorization: Bearer <token> header шалгана
 */
const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Нэвтрэх шаардлагатай. Token олдсонгүй.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // { id, name, email }
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token хүчингүй эсвэл хугацаа дууссан байна.' });
    }
};

module.exports = auth;
