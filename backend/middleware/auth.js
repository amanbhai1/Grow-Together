const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const auth = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify JWT token using secret key from environment variables
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded; // Attach user data to the request
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token invalid' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, token missing' });
    }
};

module.exports = { auth };
