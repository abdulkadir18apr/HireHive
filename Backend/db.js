const mongoose=require('mongoose');
const mongooseURI="mongodb://127.0.0.1:27017/HireHive"
mongoose.set('strictQuery', false);

const connectToMongo=async()=>{
    mongoose.connect(mongooseURI,{useNewUrlParser:true},()=>{
        console.log("Connected to Monngoo Suceessfully")

    })
}

mongoose.connection
    .once("open",()=>console.log("Connected"))
    .on('error',error=>console.log("error",error))
module.exports=connectToMongo


