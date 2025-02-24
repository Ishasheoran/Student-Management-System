

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
    email:{
        type: String,
        required: true,
        unique: true
    },
    grade: {
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



