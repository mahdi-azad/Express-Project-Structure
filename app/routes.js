const express = require("express");
const router = express.Router();

//api routes
router.use('/api/user', require("../routes/user"));
router.use('/api/auth', require("../routes/auth"));
router.use('/api/profile', require("../routes/profile"));

router.get('/health', (req, res) => {
    res.status(200).json({
        message: "Success!"
    })
})

module.exports = router;