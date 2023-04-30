const mongoose = require('mongoose');
const { Schema } = mongoose;

const enrollmentSchema = new Schema({
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
})
const enrollmentData = mongoose.model('enrollment-data', enrollmentSchema);
// enrollmentData.createCollection().then((collection) => {
//     console.log("collection is created!!")
// })
module.exports = mongoose.model('enrollment-data', enrollmentSchema)