const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Student = require('../../models/student');
const Jobs=require("../../models/jobs");
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');
const fetchuser = require('../../middleware/fetchuser');
const { upload, uploadPdf, uploadMarksheet } = require('../../middleware/upload')
const fs = require('fs');

//fetch unapplied Jobs
router.get("/fetchJobs",fetchuser,async(req,res)=>{
    try{
        const jobs=await Jobs.find({students:{$nin:req.user.id}});
        if(!jobs){
            return res.status(400).json({success:false,msg:"No Jobs Found"})
        }
        return res.json({success:true,jobs})
    }
    catch(err){
        return res.status(400).json({success:false,error:ree.message})
    }
})

router.post("/applyJob/:id",fetchuser,async(req,res)=>{
    const jobId=mongoose.Types.ObjectId(req.params.id);
    const studentId=mongoose.Types.ObjectId(req.user.id);
    try{
        const job=await Jobs.findById(jobId);
        const student=await Student.findById(studentId);
        if(!student){
            return res.status(400).json({success:false,msg:"Something went wrong"})

        }
        if(!job){
            return res.status(400).json({success:false,msg:"No job Found"})
        }

        await Jobs.updateOne({_id:jobId}, {$push: {students:studentId}});
        await Student.updateOne({_id:studentId}, {$push: {appliedJobs:jobId}});

        return res.json({success:true,msg:"Applied SuccessFully"});
    }
    catch(err){
        return res.status(400).json({success:false,error:err.message})

    }

})

router.get("/appliedJobs",fetchuser,async(req,res)=>{

    const studentId=mongoose.Types.ObjectId(req.user.id);
    try{
        const jobId=await Student.findOne({_id:studentId}).select("appliedJobs");
        if(!jobId.appliedJobs){
            return res.status(400).json({success:false,msg:"Something went wrong"})
        }
        const jobs=await Jobs.find({_id:{$in:jobId.appliedJobs}});
        if(!jobs){
            return res.status(400).json({success:false,msg:"Something went wrong"})
        }
        return res.json({success:true,jobs:jobs,total:jobs.length});


    }
    catch(err){
        return res.status(400).json({success:false,error:err.message})

    }

})



module.exports=router