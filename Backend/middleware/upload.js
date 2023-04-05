const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        }
        else {
            console.log("Invalid File Type");
            cb(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})


const storageResume = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/resume/');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})


const uploadPdf = multer({
    storage: storageResume,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf') {
            cb(null, true);
        }
        else {
            console.log("Invalid File Type");
            cb(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

const storageMarksheet = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/marksheets/');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})


const uploadMarksheet = multer({
    storage: storageMarksheet,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf') {
            cb(null, true);
        }
        else {
            console.log("Invalid File Type");
            cb(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})
module.exports = { upload, uploadPdf, uploadMarksheet };
