const mongoose = require('mongoose');
const { Schema } = mongoose;

const recruiterSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now

    },
    verified: {
        type: Boolean,
        default: false
    }
 
})
module.exports = mongoose.model('recruiter', recruiterSchema)