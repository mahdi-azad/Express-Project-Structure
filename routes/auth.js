const express = require("express")
const User = require("../models/User")
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require("../middlewares/auth");


/**
 * @route /verify-user
 * @description verify the user by token
 * @access private
 */
router.get("/verify-user", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -createdAt -updatedAt");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Server Error"
        })
    }
})
/**
 * @route /login
 * @description performing login of user
 * @access public
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password are required"
            })
        }

        //Looking for the user
        const user = await User.findOne({ email: email});
        if (!user) {
            return res.status(400).json({
                message: "User Not Found"
            })
        }

        //Checking matched password
        const isMatched = await bcrypt.compareSync(password, user.password);
        if (!isMatched) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        //generating jwt
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
            if (err) {
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }

            res.status(200).json({ message: "Signin Successul", token })
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Server Error"})
    }
})

module.exports = router;