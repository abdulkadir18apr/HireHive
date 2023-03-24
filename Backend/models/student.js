const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentScema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        required: true
    },
    enrollment: {
        type: String,
        required: true,
        unique: true
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
module.exports = mongoose.model('student', studentScema)