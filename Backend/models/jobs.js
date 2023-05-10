const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema=new Schema({
    position:String,
    companyname:String,
    employementType:String,
    skills:String,
    qualification:String,
    cuttoff:String,
    salary:String,
    modeOfProcess:String,
    rounds:Number,
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