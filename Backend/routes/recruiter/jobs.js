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
const jobs = require('../../models/jobs');


router.post("/postJob",[],fetchuser,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false,errors:errors});
    }
    try{
        const job=await Jobs.create({
            ...req.body,recruiter:req.user.id
        
        });

        return res.json({success:true,job:job});

    }
    catch(err){
        return res.status(400).json({success:false,error:err.message})
    }
    
})


router.post("/postJob",[],fetchuser,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false,errors:errors});
    }
    try{
        const job=await Jobs.create({
            ...req.body,recruiter:req.user.id
        
        });

        return res.json({success:true,job:job});

    }
    catch(err){
        return res.status(400).json({success:false,error:err.message})
    }
    

})


router.get("/fetchJob",fetchuser,async(req,res)=>{

    try{

        const jobs=await Jobs.find({recruiter:req.user.id});
        if(!jobs){
            return res.status(401).json({success:false,msg:"NO Job Found"})
        }
        return res.json({success:true,jobs});
   

    }
    catch(err){
        return res.status(400).json({success:false,error:err.message})
    }
    
})

router.post('/uploadJobDescription/:id', fetchuser, uploadPdf.single('document'), async (req, res) => {
    const jobId=req.params.id
    try {
        success = false;
        const id = req.user.id;
        const job = await jobs.findOne({ recruiter: id,_id:jobId });
        if (!job) {
            return res.status(400).json("please try  again");
        }
        if (job.document==="") {
            const res=await fs.unlinkSync(`D:/web_dev/React/HireHive/Backend/${job.document}`);
        }
        if (req.file) {
            job.document = req.file.path;
            job.save();
            success = true;
            return res.json({ success, msg: "job Description uploaded Successfully" });
        }
        else {

            return res.status(400).json({ success, msg: "please select a file" });
        }

    }
    catch (err) {
        return res.status(400).json({ success, msg: err.message });
    }
})



module.exports=router
