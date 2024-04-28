const express = require("express");
const Profile = require("../models/Profile");
const auth = require("../middlewares/auth");
const router = express.Router();


/**
 * @route /create
 * @description creating the profile for user
 * @access private
 */
router.post("/create", auth, async (req, res) => {
    try {
        const { bio, company, website, location } = req.body;

        // console.log('req', req.user);

        const profile = new Profile({
            user: req.user.id,
            bio, 
            company, 
            website, 
            location
        })

        await profile.save();
        res.status(201).json({
            message: "Profile Created Successfully",
            profile
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Server error 1"
        })
    }
})

/**
 * @route /get-profile
 * @description getting all the profiles with user information
 * @access public
 */
router.get('/get-profile', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'email']);
        console.log('profiles', profiles);
        if (profiles.length > 0) {
            return res.status(200).json({
                profiles
            })
        }
        return res.status(200).json({
            message: "No Profiles Found"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Server Error"
        })
    }
})

/**
 * @route /get
 * @description getting the profile by id
 * @access public
 */
router.get('/get/:id', async (req, res) => {
    const id = req.params.id
    try {
        const profile = await Profile.findById(id)
        if (!profile) {
            return res.status(400).json({
                message: "Profile Not Found"
            })
        }
        return res.status(200).json({
            profile
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Server Error"
        })
    }
})

/**
 * @route /update/:id
 * @description update the bio property of profile
 * @access private
 */
//patch is for 1 property change, put is for the whole thing
router.patch("/update/:id", auth, async (req, res) => {
    const id = req.params.id;
    const { bio } = req.body;
    try {
        const profile = await Profile.findById(id);
        

        if (!profile) {
            return res.status(400).json({
                message: "Profile Not Found"
            })
        }

        //checks the requested user is the owner of this profile
        console.log(req.user.id, profile?.user.toString())
        if (req.user.id !== profile?.user.toString()) {
            return res.status(400).json({
                message: "You are not allowed to update the profile"
            })
        }

        const updatedProfile = await Profile.findByIdAndUpdate(id, { $set: { bio: bio }}, { new: true })

        return res.status(200).json({
            updatedProfile
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Server Error"
        })
    }
})

/**
 * @route /delete/:id
 * @description delete the profile by id
 * @access private
 */
router.delete("/delete/:id", auth, async (req, res) => {
    const id = req.params.id;
    try {
        const profile = await Profile.findById(id);
        

        if (!profile) {
            return res.status(400).json({
                message: "Profile Not Found"
            })
        }

        //checks the requested user is the owner of this profile
        console.log(req.user.id, profile?.user.toString())
        if (req.user.id !== profile?.user.toString()) {
            return res.status(400).json({
                message: "You are not allowed to delete the profile"
            })
        }

        const updatedProfile = await Profile.findByIdAndDelete(id)

        return res.status(200).json({
            message: "Profile has been deleted"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Server Error"
        })
    }
})

module.exports = router;