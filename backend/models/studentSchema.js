import mongoose from "mongoose";
import bcrypt from "bcrypt";
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,trim: true,
        minlength: 2,
        maxlength: 50
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    dob:{
        type:Date,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
type:Number,
required:true,
unique:true,
minlength:10,maxlength:10
    },
    grade: {
        type: String,
        required: true ,
        trim:true 
    },
    Sem: {
        type: String,
        required: true ,
        trim:true 
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    
});




const Student = mongoose.model('Student', studentSchema);
export default Student;



