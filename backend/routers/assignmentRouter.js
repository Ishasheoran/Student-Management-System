// import express from "express"
// // import AssignmentController from '../controller/AssignmentController.js';
// import {createAssignment,getAllAssignments} from "../controller/assignmentController.js"
// const router=express.Router();
// router.get('/getall',getAllAssignments);
// router.post('/',createAssignment);
// export default router;

// import express from "express";
// import multer from "multer";
// import { createAssignment, getAllAssignments } from "../controller/assignmentController.js";
// const router = express.Router();
// // Multer Storage Setup
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // Save files in an "uploads" folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });

// const upload = multer({ storage });

// router.get("/getall", getAllAssignments);
// router.post("/", upload.single("file"), createAssignment); // Handle file upload

// export default router;

// import express from "express";
// import multer from "multer";
// import fs from "fs";
// import path from "path";
// import { createAssignment, getAllAssignments } from "../controller/assignmentController.js";

// const router = express.Router();

// // Ensure uploads folder exists
// const uploadDir = "uploads/";
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Multer Storage Setup
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = "uploads/";
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//         }
//         cb(null, uploadPath); // Save files in "uploads" folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });

// const upload = multer({ storage });

// router.get("/getall", getAllAssignments);
// router.post("/", upload.single("file"), createAssignment); // Handle file upload

// export default router;


import express from "express";
import multer from "multer";
import fs from "fs";
import { createAssignment, getAllAssignments } from "../controller/assignmentController.js";

const router = express.Router();

// Ensure "uploads" folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.get("/getall", getAllAssignments);
router.post("/", upload.single("file"), createAssignment);

export default router;
