const mongoose = require('mongoose');
const { Schema } = mongoose;

const recruiterProfile=new Schema({
    firstName:String,
    lastName:String,
    position:String,
    companyName:String,
    email:String,
    contact:String,
    description:String,
    profileImage:{
        type:String,
        default:null
    },
    companyLogo:{
        type:String,
        default:null
    },
    recruiter:Schema.Types.ObjectId,
    reference:[{type:Schema.Types.ObjectId,ref:"recruiter"}]
})
module.exports = mongoose.model('recriterProfile', recruiterProfile);