const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Student = require('../../models/student');
const Profile = require('../../models/studentProfile');
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');
const fetchuser = require('../../middleware/fetchuser');
const upload = require('../../middleware/upload')

//path to set Basic Details when account is created
//Login Required

router.post('/setbasicdetails',
    [body('firstName').isLength({ min: 3 })],
    fetchuser, async (req, res) => {
        const errors = validationResult(req);
        let success = false;
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() })
        }
        const id = req.user.id;
        try {
            const student = await Student.findById(id).select("-password");
            if (!student) {
                return res.status(400).json("Invalid Auth Token");
            }
            const { firstName, lastName, enrollment, email } = student;
            const BasicDetails = {
                firstName: firstName,
                lastName: lastName,
                enrollment: enrollment,
                email: email,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender,
                batch: req.body.batch,
                currentAddress: req.body.currentAddress,
                permanentAddress: req.body.permanentAddress,
                contact: req.body.contact
            }
            const studentProfile = await Profile.create({
                profileId: id,
                BasicDetails: BasicDetails
            })
            success = true;
            return res.json({ success, studentProfile });

        }
        catch (err) {
            return res.json({ success, err })
        }
    })


router.post('/profilepicture', fetchuser, upload.single('profileImage'), async (req, res) => {
    try {
        success = false;
        const id = req.user.id;
        const profile = await Profile.findOne({ profileId: id });
        if (!profile) {
            return res.status(400).json("please try login again");
        }
        if (req.file) {
            profile.profileImage = req.file.path;
            profile.save();
            success = true;
            return res.json({ success, msg: "Profile Pic uploades Successfully" });
        }
        else {

            return res.status(400).json({ success, msg: "please select a file" });
        }

    }
    catch (err) {
        return res.status(400).json({ success, msg: "something went wrong" });



    }
})




module.exports = router;







