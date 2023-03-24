const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env['JWT_KEY'];
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ success: false, msg: "Invalid Token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, error: "Please authenticate with a valid token" })
    }
}
module.exports = fetchuser