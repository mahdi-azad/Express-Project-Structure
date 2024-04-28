const express = require("express")
const User = require("../models/User")
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//making a new user
router.post("/register", async (req, res) => {
    try {
        //extracting data by object destructuring
        const { name, email, password } = req.body;

        //check user exists or not
        const user = await User.findOne({ email: email});
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        //creating the user instance
        const newUser = new User ({
            name,
            email,
            password
        })

        //hashin password 
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds)
        newUser.password = await bcrypt.hash(password, salt)

        //saving the user 
        await newUser.save()

        const payload = {
            user: {
                id: newUser.id
            }
        }

        //generating jwt
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
            if (err) {
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }

            res.status(200).json({ token })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server Error"
        })
    }
})

module.exports = router;