// import Class from "../models/classSchema.js"
// // import Class from "../models/ClassSchema.js";
// import {handleValidationError} from "../middlewares/errorHandler.js"
// export const createClass=async(req,res,next)=>{
//     console.log(req.body);
//     const {grade}=req.body;
//     try{
//         if( !grade){
// // return next("please fill form",400);
// return next(handleValidationError("Please fill out all required fields", 400));

//         }
//         await Class.create({grade});
//         res.status(200).json({
//             success:true,
//             message:"Class Created",
//         });
//     }
//     catch(err){
// next (err);
//     }
// };
// export const getAllClasses=async(req,res,next)=>{
//     try{
//         const classes=await Class.find();
//         res.status(200).json({
//             success:true,
//             classes,
//         })
//     }
//     catch(err){
//         next(err)
//     }
// }


// import Class from "../models/classSchema.js";

// export const createClass = async (req, res, next) => {
//     console.log("Received data:", req.body);
//     const { grade } = req.body;

//     try {
//         if (!grade) {
//             return res.status(400).json({ success: false, message: "Please fill out all required fields" });
//         }

//         const newClass = await Class.create({ grade });

//         res.status(201).json({
//             success: true,
//             message: "Class Created",
//             class: newClass, // ✅ Return the created class
//         });
//     } catch (err) {
//         console.error("Error creating class:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };

// export const getAllClasses = async (req, res, next) => {
//     try {
//         const classes = await Class.find();
//         res.status(200).json({
//             success: true,
//             classes,
//         });
//     } catch (err) {
//         console.error("Error fetching classes:", err);
//         res.status(500).json({ success: false, message: "Server error", error: err.message });
//     }
// };
import Class from "../models/classSchema.js";

export const createClass = async (req, res, next) => {
  console.log("Received data:", req.body);
  const { grade,subjects } = req.body;

  try {
    if (!grade ||  !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ success: false, message: "Please provide a grade." });
    }

    const newClass = await Class.create({ grade,subjects });

    res.status(201).json({
      success: true,
      message: "Class Created Successfully",
      class: newClass,
    });
  } catch (err) {
    console.error("Error creating class:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.find();
    res.status(200).json({
      success: true,
      classes,
    });
  } catch (err) {
    console.error("Error fetching classes:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
