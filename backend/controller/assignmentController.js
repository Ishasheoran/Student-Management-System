// import Assignment from "../models/assignmentSchema.js"
// import multer from "multer";
// import {handleValidationError} from "../middlewares/errorHandler.js"
// export const createAssignment=async(req,res,next)=>{
//     console.log(req.body);
//     const {title, description, grade, deadline}=req.body;
//     try{
//         if(!title|| !description|| !grade || !deadline){
// return next(handleValidationError("Please fill out all required fields", 400))
//         }
//         await Assignment.create({title, description, grade, deadline});
//         res.status(201).json({
//             success:true,
//             message:"Assignment Created",
//         });
//     }
//     catch(err){
// next (err);
//     }
// };


// export const createAssignment = async (req, res, next) => {
//     console.log(req.body);
//     const { title, description, grade, deadline } = req.body;

//     try {
//         if (!title || !description || !grade || !deadline) {
//             return res.status(400).json({ success: false, message: "Please fill out all required fields" });
//         }

//         // Check if the grade exists in the database
//         const existingClass = await Class.findOne({ grade });

//         if (!existingClass) {
//             return res.status(404).json({ success: false, message: "Grade does not exist. Please add the grade first." });
//         }
//         const assignment = await Assignment.create({ title, description, grade, deadline });

//         res.status(201).json({
//             success: true,
//             message: "Assignment Created",
//             assignment,
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// import Assignment from "../models/assignmentSchema.js";
// import Class from "../models/classSchema.js";

// // export const createAssignment = async (req, res, next) => {
// //     console.log("Request Body:", req.body);
// //     console.log("Uploaded File:", req.file); // Debugging: Check if file is received
// //     const { title, grade, deadline } = req.body;
// //     const file = req.file ? req.file.path : null; // Save file path
// //     try {
// //         if (!title || !grade || !deadline || !file) {
// //             console.error("❌ Missing required fields");
// //             return res.status(400).json({ success: false, message: "All fields are required!" });
// //         }
// //         // Check if the class exists
// //         const existingClass = await Class.findOne({ grade });
// //         if (!existingClass) {
// //             console.error("❌ Class does not exist:", grade);
// //             return res.status(404).json({ success: false, message: "Class does not exist." });
// //         }
        
// //         const assignment = await Assignment.create({ title, description: file, grade, deadline });
// //         console.log("✅ Assignment Created:", assignment);
// //         res.status(201).json({
// //             success: true,
// //             message: "Assignment Created",
// //             assignment,
// //         });
// //     } catch (err) {
// //         console.error("🔥 Server Error:", err); // Log the actual error
// //         res.status(500).json({ success: false, message: "Internal Server Error" });
// //     }
// // };
// export const createAssignment = async (req, res, next) => {
//     console.log("Request Body:", req.body);
//     console.log("Uploaded File:", req.file); // Debugging: Check if file is received

//     const { title, grade, deadline } = req.body;
//     const file = req.file ? req.file.path : null; // Save file path

//     try {
//         if (!title || !grade || !deadline || !file) {
//             console.error("❌ Missing required fields");
//             return res.status(400).json({ success: false, message: "All fields are required!" });
//         }

//         // Check if class exists
//         const existingClass = await Class.findOne({ grade });
//         if (!existingClass) {
//             console.error("❌ Class does not exist:", grade);
//             return res.status(404).json({ success: false, message: "Class does not exist." });
//         }

//         const assignment = await Assignment.create({
//             title,
//             description: file, // Store file path as description
//             grade,
//             deadline,
//         });

//         console.log("✅ Assignment Created:", assignment);
//         res.status(201).json({
//             success: true,
//             message: "Assignment uploaded successfully!",
//             assignment,
//         });
//     } catch (err) {
//         console.error("🔥 Server Error:", err);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

// export const getAllAssignments=async(req,res,next)=>{
//     try{
//         const assignments=await Assignment.find();
//         res.status(200).json({
//             success:true,
//             assignments,
//         })
//     }
//     catch(err){
//         next(err)
//     }
// }


import Assignment from "../models/assignmentSchema.js";

// ✅ Function to create a new assignment
export const createAssignment = async (req, res) => {
    try {
        const { title, grade, deadline } = req.body;
        if (!title || !grade || !deadline || !req.file) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const assignment = new Assignment({
            title,
            description: req.file.path, // Save file path
            grade,
            deadline,
        });

        await assignment.save();
        res.status(201).json({ success: true, assignment });
    } catch (error) {
        console.error("Error creating assignment:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// ✅ Function to fetch all assignments
export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json({ success: true, assignments });
    } catch (error) {
        console.error("Error fetching assignments:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

