const mongoose = require('mongoose');
const { Schema } = mongoose;



const defaultEducation={
    masters:{
      courseName:"",
      branchName:"",
      instituteName:"",
      rollNumber:"",
      started:"",
      ended:"",
      pecentage:""
    },
    bachelors:{
      courseName:"",
      branchName:"",
      instituteName:"",
      rollNumber:"",
      started:"",
      ended:"",
      pecentage:""
    },
    classTwelve:{
      courseName:"",
      instituteName:"",
      started:"",
      ended:"",
      pecentage:""
    },
    classTen:{
    courseName:"",
      instituteName:"",
      started:"",
      ended:"",
      pecentage:""
    }
      
  }



const AddressScema = new Schema({
    houseNumber: {
        type: String,
    },
    street: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    pincode: {
        type: Number,
        require: true,
        MaxLength: 6
    },
    state: {
        type: String,
        default: "Madhaya Pradesh"
    }

})

const BasicDetails = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    enrollment: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },

    dateOfBirth: {
        type: Date,
        require: true
    },
    gender: {
        type: String,
        default: null
    },
    batch: {
        type: Number,
        require: true
    },

    currentAddress: {
        type: AddressScema
    },
    permanentAddress: {
        type: AddressScema
    },
    contact: {
        type: Array, require: true
    }

})


const CourseDetail = new Schema({
    courseName: { type: String, require: true },
    branchName: { type: String },
    instituteName: { type: String, require: true },
    rollNumber: { type: String, },
    started: { type: Date, require: true },
    ended: { type: Date, require: true },
    pecentage: { type: Number, require: true },
    marksheets: { type: String,default:null }
})



const EducationDetails = new Schema({
    masters: { type: CourseDetail },
    bachelors: { type: CourseDetail, require: true },
    classTwelve: { type: CourseDetail, require: true },
    classTen: { type: CourseDetail, require: true },
    diploma: { type: CourseDetail }
})



const InternshipDetails = new Schema({
    internships: {
        type: [{
            companyName: { type: String, require: true },
            jobTitle: { type: String, require: true },
            startDate: { type: Date, require: true },
            endDate: { type: Date, require: true },
            workDetails: { type: String, default: null }
        }],
        default: null
    }

});


const ProjectDetails = new Schema({
    projects: {
        type: [{
            projectName: { type: String },
            projectLink: { type: String },
            githubRepo: { type: String },
            description: { type: String }
        }],
        default: null
    }
})


const CertificationDetails = new Schema({
    Certificates: {
        type: [{
            certificateName: { type: String },
            certificateLink: { type: String }
        }]
    }
})




const StudentProfile = new Schema({

    profileId: Schema.Types.ObjectId,

    BasicDetails: {
        type: BasicDetails,
        require: true
    },
    EducationDetails: {
        type: EducationDetails,
        default:defaultEducation
    },
    InternshipDetails: {
        type: InternshipDetails,
        default: null
    },
    skills: {
        type: Array,
        default: null
    },
    language: {
        type: Array,
        default: null
    },
    ProjectDetails: {
        type: ProjectDetails,
        default: null
    },
    CertificationDetails: {
        type: CertificationDetails,
        default: null
    },
    resume: {
        type: String,
        default: null
    },
    profileImage: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false,
        require: true
    },
    refrences: [{ type: Schema.Types.ObjectId, ref: 'student' }]


})




const studentProfile = mongoose.model('StudentProfile', StudentProfile);
module.exports = studentProfile;


