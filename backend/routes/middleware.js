
const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../config');

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        const decoded = jwt.verify(token, JWT_TOKEN);
        if(decoded && decoded.userId) {
            req.userId = decoded.userId;
            next();
        }

        return res.status(403).json({
            message: "Unauthorized"
        })
    } catch(e) {
        return res.status(403).json({
            message: "Unauthorized"
        })
    }
}