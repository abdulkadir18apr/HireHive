const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Recruiter = require('../../models/recruiter');
const Profile = require('../../models/recruiterProfile');
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');
const fetchuser = require('../../middleware/fetchuser');
const { upload, uploadPdf, uploadMarksheet } = require('../../middleware/upload')
const fs = require('fs');


// route to Add profile //login required

router.put("/addProfile",[],fetchuser,async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({success:false,error:error})
    }
    try{
        const recruiter=await Recruiter.findById(req.user.id);
        if(!recruiter){
            return res.status(400).json({success:false,error:"USer Doen't exists"})
        }
        const recruiterProfile=await Profile.create({
            ...req.body,
            recruiter:req.user.id
        })
        const savedProfile= await recruiterProfile.save();
        return res.json({success:true,profile:savedProfile});
    }
    catch(err){
        return res.status(400).json({success:false,error:err.message})
    }
})





router.post('/uploadProfileImage', fetchuser, uploadPdf.single('profileImage'), async (req, res) => {
    try {
        success = false;
        const id = req.user.id;
        const profile = await Profile.findOne({ recruiter: id });
        if (!profile) {
            return res.status(400).json("please try login again");
        }
        if (profile.profileImage !== null) {
            const res=await fs.unlinkSync(`D:/web_dev/React/HireHive/Backend/${profile.profileImage}`);
            if(!res){
                profile.profileImage=null;
            }
        }
        if (req.file) {
            profile.profileImage = req.file.path;
            profile.save();
            success = true;
            return res.json({ success, msg: "Profile picture uploaded Successfully" });
        }
        else {

            return res.status(400).json({ success, msg: "please select a file" });
        }

    }
    catch (err) {
        return res.status(400).json({ success, msg: err.message });
    }
})


router.post('/uploadCompanyLogo', fetchuser, uploadPdf.single('companyLogo'), async (req, res) => {
    try {
        success = false;
        const id = req.user.id;
        const profile = await Profile.findOne({ recruiter: id });
        if (!profile) {
            return res.status(400).json({success:false,msg:"please try login again"});
        }
        if (profile.companyLogo !== null) {
            const res=await fs.unlinkSync(`D:/web_dev/React/HireHive/Backend/${profile.companyLogo}`);
            if(!res){
                profile.companyLogo=null
            }

        }
        if (req.file) {
            profile.companyLogo = req.file.path;
            profile.save();
            success = true;
            return res.json({ success, msg: " Logo Uploaded successfully uploaded Successfully" });
        }
        else {

            return res.status(400).json({ success, msg: "please select a file" });
        }

    }
    catch (err) {
        return res.status(400).json({ success, msg: err.message });
    }
})
router.get('/getprofile', fetchuser, async (req, res) => {
    const id = req.user.id;
    let success = false;
    try {
        const recruiter = await Profile.findOne({ recruiter: id });
        if (!recruiter) {
            return res.status(400).json({ success, msg: "Profile Not Found" });
        }
        return res.json({success:true,profile:recruiter});
    }

    catch (err) {
        return res.status(400).json({ success, msg: "Something went wrong", err: err.message });
    }


})


module.exports=router