const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Student = require('../models/student');
const Enrollment = require('../models/enrollmentData');
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');
const JWT_SECRET=process.env['JWT_KEY'];
// AbdulkadirIsAGood$boy








// Route-01 route to create student sign up No Login required
router.post('/studentSignUp',[
    body("firstName","Enter a Valid Name").isLength({min:3}),
    body("lastName","enter a valid LastName").isLength({min:2}),
    body("enrollment","Enrollment No is Invalid").isLength({min:8}),
    body("email","Invalid Email").isEmail(),
    body("password","Minimum 8 characters required").isLength({min:8})
],async(req,res)=>{
    const errors=validationResult(req);
    let success=false;
    if(!errors.isEmpty()){
        res.status(400).json({success,errors:errors.array()});
    }
    try{

        //check if email already exist
        let student= await Student.findOne({email:req.body.email});
        if(student){
            return res.status(400).json({mgs:"Email Aleady Exist"});
        }
        student=await Student.findOne({enrollment:req.body.enrollment});
        if(student){
            return res.status(400).json({mgs:"Enrollment Aleady Exist"});

        }
        //verification
        let verifyStudent =await Enrollment.findOne({enrollment:req.body.enrollment,email:req.body.email});

        //encrypt The Password
        const salt= await bcrypt.genSaltSync(10);
        const secpass =await bcrypt.hashSync(req.body.password, salt);
        if(verifyStudent){
            const user=await Student.create({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                enrollment:req.body.enrollment,
                email:req.body.email,
                password:secpass
            })
            // sign data to genrate jwt token
            const data={
                user:{
                    id:user.id
                }
            }
            const authToken=jwt.sign(data, JWT_SECRET);
            success=true;
            res.json({success,authToken})
        }
        else{
            res.json("Student Not enrolled in Scsit");
        }
    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"})
    }
})

//Route 02 Login 
//No login Required
router.post('/studentLogin',[
    body('email',"Invalid Email").isEmail(),
    body('password','password cannot be blank').exists()
],async(req,res)=>{
    const errors=validationResult(req);
    let success=false;
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()})
    }
    const {email,password}=req.body;
    try{
        let student=await Student.findOne({email:req.body.email});
        if(!student){
            return res.status(400).json({success,error:"Invalid credential"});
        }
        const passwordCompare=await bcrypt.compare(password,student.password);
        if(!passwordCompare){
            return res.status(400).json({success,error:"Invalid credential"});
        }
        const data={
            user:{
                id:student.id
            }
        }
        const authToken=jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authToken})


    }
    catch(error){
        res.status(500).json(error.message)
    }

})

//Route-03 Get Student  Details Login Required
router.post('/getStudent',fetchuser,async(req,res)=>{
    try{
        const studentId=req.user.id;
        const student=await Student.findById(studentId).select("-password");
        res.json(student); 
    }
    catch(error){
        console.log(error.message)
        res.status(500).json("internal Serval error")
    }

})
module.exports=router