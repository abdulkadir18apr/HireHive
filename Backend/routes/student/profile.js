const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Student = require('../../models/student');
const Profile = require('../../models/studentProfile');
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');
const fetchuser = require('../../middleware/fetchuser');
const { upload, uploadPdf, uploadMarksheet } = require('../../middleware/upload')
const fs = require('fs');
const student = require('../../models/student');

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
            //check if basic Details already exist form a user
            const studentUser = await Profile.findOne({ profileId: id });
            if (studentUser) {
                return res.status(400).json({ success, msg: "Basic Details Already Exist" });
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
        if (profile.profileImage !== null) {
            await fs.unlinkSync(`D:/web_dev/React/HireHive/Backend/${profile.profileImage}`);

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
        return res.status(400).json({ success, msg: err.message });
    }
})


router.put('/educationdetails', [], fetchuser, async (req, res) => {
    let success = false;
    try {
        const id = req.user.id;
        const studentProfile = await Profile.findOne({ profileId: id });
        if (!studentProfile) {
            return res.status(400).json("please login Again");
        }
        studentProfile.EducationDetails = req.body;
        studentProfile.save();
        success = true;
        return res.json({ success, msg: "Education profile Updated" });
    }
    catch (err) {
        return res.status(400).json({ success, msg: "Somethong went wrong" });
    }

})
router.put('/intershipdetails', [], fetchuser, async (req, res) => {
    let success = false;
    try {

        const id = req.user.id;
        const studentProfile = await Profile.findOne({ profileId: id });
        if (!studentProfile) {
            return res.status(400).json("please login Again");
        }
        studentProfile.InternshipDetails = req.body;
        studentProfile.save();
        success = true;
        return res.json({ success, msg: "Internship Details Updated" });
    }
    catch (err) {
        return res.status(400).json({ success, msg: "Somethong went wrong" });
    }
})
router.put('/skills', [], fetchuser, async (req, res) => {
    let success = false;
    try {

        const id = req.user.id;
        const studentProfile = await Profile.findOne({ profileId: id });
        if (!studentProfile) {
            return res.status(400).json("please login Again");
        }
        studentProfile.skills = req.body.skills;
        studentProfile.language = req.body.language;
        studentProfile.save();
        success = true;
        return res.json({ success, msg: "SKills and language details Updated" });
    }
    catch (err) {
        return res.status(400).json({ success, msg: "Somethong went wrong" });
    }
})

router.put('/projectdetails', [], fetchuser, async (req, res) => {
    let success = false;
    try {

        const id = req.user.id;
        const studentProfile = await Profile.findOne({ profileId: id });
        if (!studentProfile) {
            return res.status(400).json("please login Again");
        }
        studentProfile.ProjectDetails = req.body;
        studentProfile.save();
        success = true;
        return res.json({ success, msg: "Project Details Updated details Updated" });
    }
    catch (err) {
        return res.status(400).json({ success, msg: "Somethong went wrong" });
    }
})
router.put('/certificationdetails', [], fetchuser, async (req, res) => {
    let success = false;
    try {

        const id = req.user.id;
        const studentProfile = await Profile.findOne({ profileId: id });
        if (!studentProfile) {
            return res.status(400).json("please login Again");
        }
        studentProfile.CertificationDetails = req.body;
        studentProfile.save();
        success = true;
        return res.json({ success, msg: "certifictaion DetailsUpdated details Updated" });
    }
    catch (err) {
        return res.status(400).json({ success, msg: "Somethong went wrong" });
    }
})

router.post('/resume', fetchuser, uploadPdf.single('resume'), async (req, res) => {
    try {
        success = false;
        const id = req.user.id;
        const profile = await Profile.findOne({ profileId: id });
        if (!profile) {
            return res.status(400).json("please try login again");
        }
        if (profile.resume !== null) {
            await fs.unlinkSync(`D:/web_dev/React/HireHive/Backend/${profile.resume}`);

        }
        if (req.file) {
            profile.resume = req.file.path;
            profile.save();
            success = true;
            return res.json({ success, msg: "resume uploades Successfully" });
        }
        else {

            return res.status(400).json({ success, msg: "please select a file" });
        }

    }
    catch (err) {
        return res.status(400).json({ success, msg: err.message });
    }
})


//Marksheets Upload Api

router.post('/marksheet/:course', fetchuser, uploadMarksheet.array('marksheet[]'), async (req, res) => {
    success = false;
    try {
        const { course } = req.params;
        const id = req.user.id;
        const studentProfile = await Profile.findOne({ profileId: id });
        if (!studentProfile) {
            return res.status(400).json("please try login again")
        }
        if (studentProfile.EducationDetails === null) {
            return res.status(404).json({ success, msg: "No EDUCATION dETAILS fOUND" });

        }
        if (course === 'masters') {
            if (studentProfile.EducationDetails.masters === null) {
                return res.status("400").json({ success, msg: "No masters Details Found" });
            }

            const marksheets = studentProfile.EducationDetails.masters.marksheets;

            if (req.files) {
                if (marksheets != null) {
                    const marksheetPath = marksheets.split(",");
                    marksheetPath.forEach((filePath) => fs.unlinkSync(`D:/web_dev/React/HireHive/Backend/${filePath}`))
                }
                let filePath = '';
                req.files.forEach((files) => filePath = filePath + files.path + ',');
                filePath = filePath.substring(0, filePath.lastIndexOf(','));
                studentProfile.EducationDetails.masters.marksheets = filePath;
                studentProfile.save();
                success = true;
                return res.json({ success, msg: "Marksheets uploaded successfully" });
            }
            else {
                return res.status(404).json({ success, msg: "Please Select a correct file type" })
            }

        }
        if (course === 'bachelors') {
            if (studentProfile.EducationDetails.bachelors === null) {
                return res.status("400").json({ success, msg: "No class Ten Details Found" });
            }
            const { EducationDetails: { bachelors: { marksheets } } } = studentProfile;
            if (req.files) {
                if (marksheets != null) {
                    const marksheetPath = marksheets.split(",");
                    marksheetPath.forEach((filePath) => fs.unlinkSync(`D:/web_dev/React/HireHive/Backend/${filePath}`))
                }
                let filePath = '';
                req.files.forEach((files) => filePath = filePath + files.path + ',');
                filePath = filePath.substring(0, filePath.lastIndexOf(','));
                studentProfile.EducationDetails.bachelors.marksheets = filePath;
                studentProfile.save();
                success = true;
                return res.json({ success, msg: "Marksheets uploaded successfully" });
            }
            else {
                return res.status(404).json({ success, msg: "Please Select a correct file type" })
            }
        }
        if (course === 'classTwelve') {
            if (studentProfile.EducationDetails.classTwelve === null) {
                return res.status("400").json({ success, msg: "No class Ten Details Found" });
            }
            const { EducationDetails: { classTwelve: { marksheets } } } = studentProfile;
            if (req.files) {
                if (marksheets != null) {
                    const marksheetPath = marksheets.split(",");
                    marksheetPath.forEach((filePath) => fs.unlinkSync(`D:/web_dev/React/HireHive/Backend/${filePath}`))
                }
                let filePath = '';
                req.files.forEach((files) => filePath = filePath + files.path + ',');
                filePath = filePath.substring(0, filePath.lastIndexOf(','));
                studentProfile.EducationDetails.classTwelve.marksheets = filePath;
                studentProfile.save();
                success = true;
                return res.json({ success, msg: "Marksheets uploaded successfully" });
            }
            else {
                return res.status(404).json({ success, msg: "Please Select a correct file type" })
            }

        }
        if (course === 'classTen') {
            if (studentProfile.EducationDetails.classTen === null) {
                return res.status("400").json({ success, msg: "No class Ten Details Found" });
            }
            const { EducationDetails: { classTen: { marksheets } } } = studentProfile;
            if (req.files) {
                if (marksheets != null) {
                    const marksheetPath = marksheets.split(",");
                    marksheetPath.forEach((filePath) => fs.unlinkSync(`D:/web_dev/React/HireHive/Backend/${filePath}`))
                }
                let filePath = '';
                req.files.forEach((files) => filePath = filePath + files.path + ',');
                filePath = filePath.substring(0, filePath.lastIndexOf(','));
                studentProfile.EducationDetails.classTen.marksheets = filePath;
                studentProfile.save();
                success = true;
                return res.json({ success, msg: "Marksheets uploaded successfully" });
            }
            else {
                return res.status(404).json({ success, msg: "Please Select a correct file type" })
            }

        }
        if (course === 'diploma') {
            if (studentProfile.EducationDetails.diploma === null) {
                return res.status("400").json({ success, msg: "No diploma Details Found" });
            }
            const { EducationDetails: { diploma: { marksheets } } } = studentProfile;
            if (req.files) {
                if (marksheets != null) {
                    const marksheetPath = marksheets.split(",");
                    marksheetPath.forEach((filePath) => fs.unlinkSync(`D:/web_dev/React/HireHive/Backend/${filePath}`))
                }
                let filePath = '';
                req.files.forEach((files) => filePath = filePath + files.path + ',');
                filePath = filePath.substring(0, filePath.lastIndexOf(','));
                studentProfile.EducationDetails.diploma.marksheets = filePath;
                studentProfile.save();
                success = true;
                return res.json({ success, msg: "Marksheets uploaded successfully" });
            }
            else {
                return res.status(404).json({ success, msg: "Please Select a correct file type" })
            }

        }
    }

    catch (err) {
        return res.status(400).json({ success, msg: "Something went wrong", err: err.message });
    }


})

router.get('/getprofiledetails', fetchuser, async (req, res) => {
    const id = req.user.id;
    let success = false;
    try {
        const studentProfile = await Profile.findOne({ profileId: id });
        if (!studentProfile) {
            return res.status(400).json({ success, msg: "Profile Not Found" });
        }
        return res.json(studentProfile);
    }

    catch (err) {
        return res.status(400).json({ success, msg: "Something went wrong", err: err.message });
    }


})





module.exports = router;







