const mongoose = require('mongoose');
const { Schema } = mongoose;

const userOtpVerificationSchema = new Schema({
    user: Schema.Types.ObjectId,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
    refrences: [{ type: Schema.Types.ObjectId, ref: 'student' }]
})
const userOtpVerification = mongoose.model('userOtpVerification', userOtpVerificationSchema);
module.exports = userOtpVerification;