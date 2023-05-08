const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema=new Schema({
    title:String,
    companyname:String,
    employementype:String,
    skills:String,
    cuttoff:String,
    cuttoff:String,
    positionCount:Number,
    salary:String,
    modeOfProcess:String,
    rounds:Number,
    timeline:[
        {
            roundName:String,
            date:Date,
            description:String

        }
    ] ,
    description:String,
    document:String,
    recruiter:{
        type:Schema.Types.ObjectId,
        ref:"recruiter"
    },
    students:[{
        type:Schema.Types.ObjectId,
        ref:"student"
    }],

})

module.exports=mongoose.model('jobs',jobSchema)