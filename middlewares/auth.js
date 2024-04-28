const jwt = require("jsonwebtoken");
require('dotenv').config("../.env");

//this middleware will check token if valid or not
const auth = (req, res, next) => {
    const token = req.header('authy-token');

    if (!token) {
        return res.status(400).json({
            message: "Authorization Failed"
        })
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized"
        })
    }
}

module.exports = auth;