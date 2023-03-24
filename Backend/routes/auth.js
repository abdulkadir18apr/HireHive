const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Student = require('../models/student');
const Enrollment = require('../models/enrollmentData');
const userOtpVerification = require('../models/userOtpVerification');
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const Oauth2 = google.auth.OAuth2;

//create a clent
const Oauth2_client = new Oauth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
Oauth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
//setup for mail
const accessToken = Oauth2_client.getAccessToken();
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.AUTH_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
    }
})

const JWT_SECRET = process.env['JWT_KEY'];





// Route-01 route to create student sign up No Login required
router.post('/studentSignUp', [
    body("firstName", "Enter a Valid Name").isLength({ min: 3 }),
    body("lastName", "enter a valid LastName").isLength({ min: 2 }),
    body("enrollment", "Enrollment No is Invalid").isLength({ min: 8 }),
    body("email", "Invalid Email").isEmail(),
    body("password", "Minimum 8 characters required").isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {

        //check if email already exist
        let student = await Student.findOne({ email: req.body.email });
        if (student) {
            return res.status(400).json({ success, mgs: "Email Aleady Exist" });
        }
        student = await Student.findOne({ enrollment: req.body.enrollment });
        if (student) {
            return res.status(400).json({ success, mgs: "Enrollment Aleady Exist" });

        }
        //verification
        let verifyStudent = await Enrollment.findOne({ enrollment: req.body.enrollment, email: req.body.email });

        //encrypt The Password
        const salt = await bcrypt.genSaltSync(10);
        const secpass = await bcrypt.hashSync(req.body.password, salt);
        if (verifyStudent) {
            const user = await Student.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                enrollment: req.body.enrollment,
                email: req.body.email,
                password: secpass
            })
            user.save().then((result) => {
                sendOtpVerificationEmail(result, res);
            })
        }
        else {
            return res.json({ success, msg: "Student Not enrolled in Scsit" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
})

//Route 01.01 verify OTP //NO LOGIN Required
//verifyOtp function
const verifyOtp = async (id, otp) => {
    let success = false;
    let student = await userOtpVerification.findById(id);
    if (!student) {
        console.log("INvalid credential");
        return (success);
    }
    const otpComapare = await bcrypt.compare(otp, student.otp);
    if (!otpComapare) {
        console.log("Invalid Otp")
        return (success)
    }
    if (Date.parse(student.expiresAt) < Date.now()) {
        console.log("OTP Expired")
        return (success)
    }
    success = true;
    return success;

}

router.post('/studentverify', [body('otp').isLength({ min: 4 })], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    try {
        const { id, otp } = req.body
        let success = await verifyOtp(id, otp);
        if (!success) {
            await Student.findOneAndDelete({ verified: false });
            return res.json({ success, msg: "Otp verification Failed" });

        }
        let student = await userOtpVerification.findById(id);
        if (!student) {
            return res.status(500).json({ success: false, msg: "something went wrong" })
        }


        await Student.findByIdAndUpdate(student.user, { verified: true });
        await userOtpVerification.findByIdAndDelete(id);
        const data = {
            user: {
                id: student.user
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        return res.json({ success, authToken })

    }

    catch (err) {

        return res.status(500).json({ error: "Internal Server Error", err: err.message })

    }


})
//Route 02 Login 
//No login Required
router.post('/studentLogin', [
    body('email', "Invalid Email").isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let student = await Student.findOne({ email: req.body.email });
        if (!student) {
            return res.status(400).json({ success, error: "Invalid credential" });
        }
        const passwordCompare = await bcrypt.compare(password, student.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Invalid credential" });
        }
        const data = {
            user: {
                id: student.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })


    }
    catch (error) {
        res.status(500).json(error.message)
    }

})

//Route-03 Get Student  Details Login Required
router.post('/getStudent', fetchuser, async (req, res) => {
    let success = false;
    try {
        const studentId = req.user.id;
        const student = await Student.findById(studentId).select("-password");
        res.json({ success: true, student });
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ success, msg: "Internal Server Error" })
    }

})

//Otp generator function
const sendOtpVerificationEmail = async ({ _id, email }, res) => {


    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify your account to signup",
            plain: "Abdul  Kaidir",
            html: `<p>Enter <b>${otp} </b> in the app to verify your email address to process the sign process.</p><p>Otp expires in 5 min</p>`
        }
        const saltOtp = await bcrypt.genSaltSync(10);
        const hashOtp = await bcrypt.hashSync(otp, saltOtp);
        const newUser = new userOtpVerification({
            user: _id,
            otp: hashOtp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 500000
        })
        await newUser.save();
        await transporter.sendMail(mailOptions, (err, result) => {
            if (err) {
                console.log("Error: ", err)
            }
            else {
                console.log("Success");
            }
        });

        const data = {
            user: _id, email
        }
        return res.json({

            success: true,
            message: "Verification Otp email Sent",
            status: "PENDING",
            id: newUser._id,
            data
        });

    }
    catch (err) {
        return res.json({
            success: false,
            message: "something went wrong",
            status: "FAILED",
            error: err.message
        });



    }
}


//forgot Password End Point 

router.post('/studentforgot', [body('email').isEmail(), body('enrollment').isLength({ min: 8 })], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    const { email, enrollment } = req.body;
    try {
        //verify email is Student
        let student = await Student.findOne({ email: email, enrollment: enrollment });
        if (!student) {
            return res.status(500).json({ msg: "Not a valid User" });
        }
        const credential = { _id: student._id, email: email }
        await sendOtpVerificationEmail(credential, res);

    }
    catch (err) {
        res.json({
            message: "something went wrong",
            status: "FAILED",
            error: err.message
        });

    }
})
//update Password  NO Login required
router.post('/studentupdate', [body('otp').isLength({ min: 4 }), body('password').isLength({ min: 8 })], async (req, res) => {
    const errors = validationResult(req);
    const salt = await bcrypt.genSaltSync(10);
    const secpass = await bcrypt.hashSync(req.body.password, salt);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    try {
        const { id, otp } = req.body;
        let verifyRes = await verifyOtp(id, otp);
        if (!verifyRes) {
            return res.status(400).json({ success: false, msg: "Something went wrong" });
        }
        let student = await userOtpVerification.findById(id);
        await Student.findByIdAndUpdate(student.user, { password: secpass })
        await userOtpVerification.findByIdAndDelete(student._id);
        return res.json({ success: true, msg: "Password Updated Successfully" })
    }
    catch (err) {
        res.json({
            message: "something went wrong",
            status: "FAILED",
            error: err.message
        });
    }

})
module.exports = router
