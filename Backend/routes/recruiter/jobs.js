const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Recruiter = require('../../models/recruiter');
const Jobs=require("../../models/jobs");
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');
const fetchuser = require('../../middleware/fetchuser');
const { upload, uploadPdf, uploadMarksheet } = require('../../middleware/upload')
const fs = require('fs');


router.post("/postJob",[],fetchuser,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false,errors:errors});
    }
    try{
        const job=Jobs.create({
            ...req.body,recruiter:req.user.id
        
        })

        return res.json({success:true,job:job});

    }
    catch(err){
        return res.status(400).json({success:false,error:err.message})
    }
    
})


router.delete("/deleteJob/:id",[],fetchuser,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false,errors:errors});
    }
    try{

        const job=await Jobs.findById(req.params.id);
        if(!job){
            return res.status(401).json("Please Login ")
        }
        if(job.recruiter.toString()!==req.user.id){
            return res.status(401).json({success:false,msg:"cannot be deleted "})
        }
        await Jobs.findByIdAndDelete(req.params.id);
        return res.json({suceess:true,job});
   

    }
    catch(err){
        return res.status(400).json({success:false,error:err.message})
    }
    
})


module.exports=router
