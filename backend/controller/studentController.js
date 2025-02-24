    // import Student from "../models/studentSchema.js"
    // // import Student from "../models/studentSchema.js";
    // import {handleValidationError} from "../middlewares/errorHandler.js"
    // export const createStudent=async(req,res,next)=>{
    //     console.log(req.body);
    //     const {name, registrationNumber, grade}=req.body;
    //     try{
    //         if(!name || !registrationNumber || !grade){
    // // return next("please fill form",400);
    // return next(handleValidationError("Please fill out all required fields", 400))}
    // const newStudent=await Student.create({name,registrationNumber,grade});
    // res.status(200).json({
    //             success:true,
    //             message:"Student Created",
    //             student: newStudent
    //         });
    //     }
    //     catch(err){
    // next (err);
    //     }
    // };
    // export const getAllStudents=async(req,res,next)=>{
    //     try{
    //         const students=await Student.find();
    //         res.status(200).json({
    //             success:true,
    //             students,
    //         })
    //     }
    //     catch(err){
    //         next(err)
    //     }
    // }


//     import Student from "../models/studentSchema.js";
// import Class from "../models/classSchema.js";
// import { handleValidationError } from "../middlewares/errorHandler.js";

// export const createStudent = async (req, res, next) => {
//     console.log(req.body);
//     const { name, registrationNumber, grade } = req.body;

//     try {
//         if (!name || !registrationNumber || !grade) {
//             return next(handleValidationError("Please fill out all required fields", 400));
//         }

//         // ✅ Check if the class (grade) exists
//         const existingClass = await Class.findOne({ grade });

//         if (!existingClass) {
//             return res.status(404).json({ success: false, message: "Grade does not exist. Please add the grade first." });
//         }

//         const newStudent = await Student.create({ name, registrationNumber, grade });

//         res.status(200).json({
//             success: true,
//             message: "Student Created",
//             student: newStudent
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// import Student from "../models/studentSchema.js";
// import Class from "../models/classSchema.js";
// import { handleValidationError } from "../middlewares/errorHandler.js";

// // ✅ Ensure createStudent is properly exported
// export const createStudent = async (req, res, next) => {
//     console.log(req.body);
//     const { name, registrationNumber, grade } = req.body;

//     try {
//         if (!name || !registrationNumber || !grade) {
//             return next(handleValidationError("Please fill out all required fields", 400));
//         }

//         // ✅ Check if the grade exists before adding student
//         const existingClass = await Class.findOne({ grade });

//         if (!existingClass) {
//             return res.status(404).json({ success: false, message: "Grade does not exist. Please add the grade first." });
//         }

//         const newStudent = await Student.create({ name, registrationNumber, grade });

//         res.status(200).json({
//             success: true,
//             message: "Student Created",
//             student: newStudent
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// // ✅ Ensure getAllStudents is properly exported
// export const getAllStudents = async (req, res, next) => {
//     try {
//         const students = await Student.find();
//         res.status(200).json({
//             success: true,
//             students,
//         });
//     } catch (err) {
//         next(err);
//     }
// };


// export const getStudentsByGrade = async (req, res) => {
//     try {
//       const { grade } = req.params; // Get grade from request parameters
  
//       if (!grade) {
//         return res.status(400).json({ success: false, message: "Grade is required" });
//       }
  
//       const students = await Student.find({ grade }); // Fetch students by grade
  
//       if (!students.length) {
//         return res.status(404).json({ success: false, message: "No students found for this grade" });
//       }
  
//       res.status(200).json({ success: true, students });
//     } catch (error) {
//       console.error("Error fetching students by grade:", error);
//       res.status(500).json({ success: false, message: "Server error", error: error.message });
//     }
//   };
  

import Student from "../models/studentSchema.js";
import Class from "../models/classSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import { handleValidationError } from "../middlewares/errorHandler.js";

// ✅ Create a Student with Password Hashing
export const createStudent = async (req, res, next) => {
    console.log(req.body);
    const { name, registrationNumber, grade, password } = req.body;

    try {
        if (!name || !registrationNumber || !grade || !password) {
            return next(handleValidationError("Please fill out all required fields", 400));
        }

        // ✅ Check if the grade exists before adding student
        const existingClass = await Class.findOne({ grade });

        if (!existingClass) {
            return res.status(404).json({ success: false, message: "Grade does not exist. Please add the grade first." });
        }
        const existingStudent = await Student.findOne({ registrationNumber });
        if (existingStudent) {
            return res.status(400).json({ success: false, message: "Student already exists!" });
        }
        // 🔐 Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = await Student.create({ 
            name, 
            registrationNumber, 
            grade, 
            password: hashedPassword 
        });

        res.status(201).json({
            success: true,
            message: "Student Created",
            student: newStudent
        });
    } catch (err) {
        console.error("Error creating student:", err);
        res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
};

// ✅ Get All Students
export const getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.find().select("-password"); // Exclude password for security
        res.status(200).json({
            success: true,
            students,
        });
    } catch (err) {
        next(err);
    }
};


// ✅ Get Students by Grade
export const getStudentsByGrade = async (req, res) => {
    try {
        const { grade } = req.params; // Get grade from request parameters

        if (!grade) {
            return res.status(400).json({ success: false, message: "Grade is required" });
        }

        const students = await Student.find({ grade }).select("-password"); // Exclude password

        if (!students.length) {
            return res.status(404).json({ success: false, message: "No students found for this grade" });
        }

        res.status(200).json({ success: true, students });
    } catch (error) {
        console.error("Error fetching students by grade:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
export const studentLogin = async (req, res) => {
    try {
        console.log("Received login request:", req.body); // ✅ Log input data

        const { registrationNumber, password } = req.body;
        if (!registrationNumber || !password) {
            console.log("Missing fields:", { registrationNumber, password });
            return res.status(400).json({ success: false, message: "Enter registration number and password" });
        }

        const student = await Student.findOne({ registrationNumber });
        if (!student) {
            console.log("Student not found:", registrationNumber);
            return res.status(401).json({ success: false, message: "Student not found" });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            console.log("Password mismatch for:", registrationNumber);
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: student._id }, "secretKey", { expiresIn: "1h" });

        console.log("Login successful for:", registrationNumber);
        res.status(200).json({ success: true, token });

    } catch (error) {
        console.error("Login error at line 237:", error); // ✅ Log error
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

