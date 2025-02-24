// import Exam from "../models/examSchema.js"

// // import Exam from "../models/ExamSchema.js";
// import {handleValidationError} from "../middlewares/errorHandler.js"
// export const createExam=async(req,res,next)=>{
//     console.log(req.body);
//     const {name, registrationNumber, className, marks}=req.body;
//     try{
//         if(!name || !registrationNumber || !className || !marks){
// // return next("please fill form",400);
// return next(handleValidationError("Please fill out all required fields", 400));
//         }
//         await Exam.create({name,registrationNumber,className, marks});
//         res.status(200).json({
//             success:true,
//             message:"Exam Created",
//             exam:newExam
//         });
//     }
//     catch(err){
// next (err);
//     }
// };
// export const getAllExams=async(req,res,next)=>{
//     try{
//         const exams=await Exam.find();
//         res.status(200).json({
//             success:true,
//             exams,
//         })
//     }
//     catch(err){
//         next(err)
//     }
// }




// export const createExam = async (req, res, next) => {
//     console.log("Received data:", req.body);

//     const { name, registrationNumber, className, marks } = req.body;

//     try {
//         if (!name || !registrationNumber || !className || !marks) {
//             return res.status(400).json({ success: false, message: "Please fill out all required fields" });
//         }

//         const newExam = await Exam.create({ 
//             name, 
//             registrationNumber, 
//             className, 
//             marks: Number(marks)  // Ensure marks is a number
//         });

//         res.status(201).json({
//             success: true,
//             message: "Exam Created",
//             exam: newExam, // ✅ Correctly returning the created exam
//         });
//     } catch (err) {
//         console.error("Error creating exam:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };



// import Exam from "../models/examSchema.js";
// export const getAllExams = async (req, res, next) => {
//     try {
//         const exams = await Exam.find();
//         res.status(200).json({
//             success: true,
//             exams,
//         });
//     } catch (err) {
//         console.error("Error fetching exams:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };
// export const createExam = async (req, res, next) => {
//     console.log("Received data:", req.body);

//     const { name, registrationNumber, className, subject, marks } = req.body;

//     try {
//         if (!name || !registrationNumber || !className || !subject || !marks) {
//             return res.status(400).json({ success: false, message: "Please fill out all required fields" });
//         }

//         const newExam = await Exam.create({ 
//             name, 
//             registrationNumber, 
//             className, 
//             subject, // ✅ Include subject
//             marks: Number(marks)
//         });

//         res.status(201).json({
//             success: true,
//             message: "Exam Created",
//             exam: newExam,
//         });
//     } catch (err) {
//         console.error("Error creating exam:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };


// import Exam from "../models/examSchema.js";

// export const getAllExams = async (req, res) => {
//     try {
//         const exams = await Exam.find();
//         res.status(200).json({
//             success: true,
//             exams,
//         });
//     } catch (err) {
//         console.error("Error fetching exams:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };

// export const addOrUpdateExam = async (req, res) => {
//     console.log("Received data:", req.body);

//     const { registrationNumber, className, subject, marks } = req.body;

//     try {
//         if (!registrationNumber || !className || !subject || !marks) {
//             return res.status(400).json({ success: false, message: "Please fill out all required fields." });
//         }

//         const existingExam = await Exam.findOne({ registrationNumber, className });

//         if (!existingExam) {
//             return res.status(404).json({ success: false, message: "Enrollment number and class do not exist." });
//         }

//         existingExam.subject = subject;
//         existingExam.marks = marks;
//         await existingExam.save();

//         res.status(200).json({
//             success: true,
//             message: "Successfully updated marks!",
//             exam: existingExam,
//         });
//     } catch (err) {
//         console.error("Error updating exam:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };

// import Exam from "../models/examSchema.js";

// export const addOrUpdateExam = async (req, res) => {
//     console.log("Received data:", req.body);

//     const { registrationNumber, className, subject, marks } = req.body;

//     try {
//         if (!registrationNumber || !className || !subject || marks === undefined) {
//             return res.status(400).json({ success: false, message: "Please fill out all required fields." });
//         }

//         let existingExam = await Exam.findOne({ registrationNumber, className });

//         if (!existingExam) {
//             return res.status(404).json({ success: false, message: "Enrollment number and class do not exist." });
//         }

//         // Check if subject already exists
//         const subjectExists = existingExam.subjects?.some(s => s.name === subject);

//         if (subjectExists) {
//             return res.status(400).json({ success: false, message: "Subject already exists for this student." });
//         }

//         // Add new subject and marks
//         existingExam.subjects.push({ name: subject, marks });

//         await existingExam.save();

//         res.status(200).json({
//             success: true,
//             message: "Successfully added new subject and marks!",
//             exam: existingExam,
//         });
//     } catch (err) {
//         console.error("Error updating exam:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };


// import Exam from "../models/examSchema.js";

// export const getAllExams = async (req, res) => {
//     try {
//         const exams = await Exam.find();
//         res.status(200).json({
//             success: true,
//             exams,
//         });
//     } catch (err) {
//         console.error("Error fetching exams:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };

// export const addOrUpdateExam = async (req, res) => {
//     console.log("Received data:", req.body);

//     const { registrationNumber, className, subject, marks } = req.body;

//     try {
//         if (!registrationNumber || !className || !subject || marks === undefined) {
//             return res.status(400).json({ success: false, message: "Please fill out all required fields." });
//         }

//         let existingExam = await Exam.findOne({ registrationNumber, className });

//         if (!existingExam) {
//             return res.status(404).json({ success: false, message: "Enrollment number and class do not exist." });
//         }

//         // Check if subject already exists
//         const subjectExists = existingExam.subjects?.some(s => s.name === subject);

//         if (subjectExists) {
//             return res.status(400).json({ success: false, message: "Subject already exists for this student." });
//         }

//         // Add new subject and marks
//         existingExam.subjects.push({ name: subject, marks });

//         await existingExam.save();

//         res.status(200).json({
//             success: true,
//             message: "Successfully added new subject and marks!",
//             exam: existingExam,
//         });
//     } catch (err) {
//         console.error("Error updating exam:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };

// import Student from "../models/studentSchema.js";


// // ✅ Get Exam Results by Student Registration Number
// export const getStudentExams = async (req, res) => {
//     try {
//         const { registrationNumber, className } = req.query;

//         if (!registrationNumber || !className) {
//             return res.status(400).json({ success: false, message: "Student registration number and class are required." });
//         }

//         const exam = await Exam.findOne({ registrationNumber, className });

//         if (!exam) {
//             return res.status(404).json({ success: false, message: "No exam results found for this student." });
//         }

//         res.status(200).json({ success: true, exam });
//     } catch (err) {
//         console.error("Error fetching student exam results:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };
// import Exam from "../models/examModel.js";


// import Student from "../models/studentSchema.js";
// import Exam from "../models/examSchema.js";
// export const getStudentExamResults = async (req, res) => {
//     const { registrationNumber } = req.query;

//     try {
//         // ✅ Find student by registration number
//         const student = await Student.findOne({ registrationNumber });

//         if (!student) {
//             return res.status(404).json({ success: false, message: "Student not found" });
//         }

//         // ✅ Fetch exam results based on student ID
//         const examResults = await Exam.findOne({ studentId: student._id });

//         if (!examResults) {
//             return res.status(404).json({ success: false, message: "No exam results found." });
//         }

//         res.status(200).json({ success: true, exam: examResults });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error", error: error.message });
//     }
// };
import Student from "../models/studentSchema.js";
import Exam from "../models/examSchema.js";

export const getStudentExamResults = async (req, res) => {
    const { registrationNumber } = req.query;

    try {
        // ✅ Find student by registration number
        const student = await Student.findOne({ registrationNumber });

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // ✅ Fetch exam results by registrationNumber instead of studentId
        const examResults = await Exam.findOne({ registrationNumber });

        if (!examResults) {
            return res.status(404).json({ success: false, message: "No exam results found." });
        }

        res.status(200).json({ success: true, exam: examResults });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json({
            success: true,
            exams,
        });
    } catch (err) {
        console.error("Error fetching exams:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const addOrUpdateExam = async (req, res) => {
    console.log("Received data:", req.body);

    const { registrationNumber, className, subject, marks } = req.body;

    try {
        if (!registrationNumber || !className || !subject || marks === undefined) {
            return res.status(400).json({ success: false, message: "Please fill out all required fields." });
        }

        const studentExists = await Student.findOne({ registrationNumber, grade: className });

        if (!studentExists) {
            return res.status(404).json({ success: false, message: "Student with this enrollment number and class does not exist." });
        }

        let existingExam = await Exam.findOne({ registrationNumber, className });

        if (!existingExam) {
            existingExam = new Exam({
                registrationNumber,
                className,
                subjects: [{ name: subject, marks }]
            });
        } else {
            const subjectIndex = existingExam.subjects.findIndex(s => s.name === subject);

            if (subjectIndex !== -1) {
                existingExam.subjects[subjectIndex].marks = marks;
            } else {
                existingExam.subjects.push({ name: subject, marks });
            }
        }

        await existingExam.save();

        res.status(200).json({
            success: true,
            message: "Successfully added/updated subject marks!",
            exam: existingExam,
        });
    } catch (err) {
        console.error("Error updating exam:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

