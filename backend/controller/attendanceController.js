// import Attendance from "../models/attendanceSchema.js"
// // import Attendance from "../models/AttendanceSchema.js";
// import {handleValidationError} from "../middlewares/errorHandler.js"
// export const markAttendance=async(req,res,next)=>{
//     // console.log("Received request body:", req.body);

//     console.log(req.body);
//     const {attendanceData}=req.body;
//     try{
//         if(!attendanceData || !Array.isArray(attendanceData)|| attendanceData.length ===0){
// // return next("please fill form",400);
// return res.status(400).json({ success: false, message: "Please fill out all required fields" });

//         }
//       const attendanceRecords=await Promise.all(attendanceData.map(async(record)=>{
//         const{student,status}=record;
//         // return await Attendance.create({ student: student, status });

//         return await Attendance.create({student, status});
//       }));
//       res.status(200).json({
//         success:true,
//         message:"Attendance marked",
//         attendanceRecords,
//       });
//     }
//     catch(err){
// next (err);
//     }
// };
// export const getAllAttendances=async(req,res,next)=>{
//     try{
//         const attendanceRecords=await Attendance.find().populate("student","name registrationNumber grade");
//         res.status(200).json({
//             success:true,
//             attendanceRecords,
//         })
//     }
//     catch(err){
//         next(err)
//     }
// }

// import Attendance from "../models/attendanceSchema.js";

// export const markAttendance = async (req, res, next) => {
//     console.log("Received request body:", JSON.stringify(req.body, null, 2));
//     const { attendanceData } = req.body;

//     try {
//         if (!attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
//             return res.status(400).json({ success: false, message: "Please fill out all required fields" });
//         }

//         const attendanceRecords = await Promise.all(
//             attendanceData.map(async (record) => {
//                 const { student, status } = record;

//                 if (!status?.trim()) {
//                     console.warn(`Skipping record for student ${student} due to missing status`);
//                     return null; // Skip invalid records
//                 }

//                 return await Attendance.create({ student: student, status });
//             })
//         );

//         const validRecords = attendanceRecords.filter(Boolean); // Remove skipped records

//         res.status(200).json({
//             success: true,
//             message: "Attendance marked",
//             attendanceRecords: validRecords,
//         });
//     } catch (err) {
//         console.error("Error in markAttendance:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };

// export const getAllAttendances = async (req, res, next) => {
//     try {
//         const attendanceRecords = await Attendance.find().populate("student", "name registrationNumber grade");

//         res.status(200).json({
//             success: true,
//             attendanceRecords,
//         });
//     } catch (err) {
//         console.error("Error in getAllAttendances:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };


// import Attendance from "../models/attendanceSchema.js";
// import mongoose from "mongoose";

// export const getStudentAttendance = async (req, res) => {
//     const { registrationNumber } = req.query;

//     try {
//         // ✅ Find the student by registration number
//         const student = await Student.findOne({ registrationNumber });

//         if (!student) {
//             return res.status(404).json({ success: false, message: "Student not found" });
//         }

//         // ✅ Fetch attendance based on student ID
//         const attendanceRecords = await Attendance.find({ studentId: student._id });

//         res.status(200).json({ success: true, attendance: attendanceRecords });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error", error: error.message });
//     }
// };
// import Attendance from "../models/attendanceSchema.js";
import { Attendance } from "../models/attendanceSchema.js";  // ✅ Fix: Named Import

import Student from "../models/studentSchema.js";

export const getStudentAttendance = async (req, res) => {
    const { registrationNumber } = req.query;

    try {
        // ✅ Find student by registration number
        const student = await Student.findOne({ registrationNumber });

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // ✅ Fetch attendance using student._id
        const attendanceRecords = await Attendance.find({ student: student._id });

        if (!attendanceRecords.length) {
            return res.status(404).json({ success: false, message: "No attendance records found." });
        }

        res.status(200).json({ success: true, attendance: attendanceRecords });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getAllAttendances = async (req, res, next) => {
    try {
        const attendanceRecords = await Attendance.find().populate("student", "name registrationNumber grade");

        res.status(200).json({
            success: true,
            attendanceRecords,
        });
    } catch (err) {
        console.error("Error in getAllAttendances:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// export const markAttendance = async (req, res) => {
//     const { classId, attendanceData } = req.body;

//     try {
//         if (!classId || !attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         const attendanceRecords = await Promise.all(
//             attendanceData.map(async (record) => {
//                 const { student, status, date } = record;

//                 if (!status?.trim() || !date) {
//                     console.warn(`Skipping record for student ${student} due to missing status or date`);
//                     return null;
//                 }

//                 return await Attendance.create({ student: student, classId, status, date });
//             })
//         );

//         res.status(200).json({
//             success: true,
//             message: "Attendance marked successfully",
//             attendanceRecords: attendanceRecords.filter(Boolean),
//         });
//     } catch (err) {
//         console.error("Error in markAttendance:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };


// export const markAttendance = async (req, res) => {
//     const { classId, attendanceData } = req.body;

//     try {
//         if (!classId || !attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         const attendanceRecords = await Promise.all(
//             attendanceData.map(async (record) => {
//                 const { studentId, status, date } = record;

//                 if (!studentId || !status?.trim() || !date) {
//                     console.warn(`Skipping record due to missing studentId, status, or date`);
//                     return null;
//                 }

//                 return await Attendance.create({ student: studentId, classId, status, date });
//             })
//         );

//         res.status(200).json({
//             success: true,
//             message: "Attendance marked successfully",
//             attendanceRecords: attendanceRecords.filter(Boolean),
//         });
//     } catch (err) {
//         console.error("Error in markAttendance:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };
export const markAttendance = async (req, res) => {
    const { classId, attendanceData } = req.body;

    // ✅ Debugging logs
    console.log("Received Attendance Data:", JSON.stringify(req.body, null, 2));

    try {
        if (!classId || !attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const attendanceRecords = await Promise.all(
            attendanceData.map(async (record) => {
                const { studentId, status, date } = record;

                // ✅ Check if studentId, status, or date is missing
                if (!studentId || !status?.trim() || !date) {
                    console.warn("Skipping record due to missing studentId, status, or date", record);
                    return null;
                }

                return await Attendance.create({ student: studentId, classId, status, date });
            })
        );

        res.status(200).json({
            success: true,
            message: "Attendance marked successfully",
            attendanceRecords: attendanceRecords.filter(Boolean),
        });
    } catch (err) {
        console.error("Error in markAttendance:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
