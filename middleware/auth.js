const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({ msg: "Auth Error" });
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ msg: "Invalid Token" });
    }
};