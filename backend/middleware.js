
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const userMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        console.log("hi");
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }
};

module.exports = {
    userMiddleware
}