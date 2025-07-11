

import express from "express";
import multer from "multer";
import { 
    getAllExams, 
    addOrUpdateExam,
    getStudentExamResults,
    bulkUploadExams
} from "../controller/examController.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// Get all exams
router.get('/getall', getAllExams);

// Add or update single exam record
router.post('/', addOrUpdateExam);

// Get student exam results
router.get("/student", getStudentExamResults);

// Bulk upload exams
router.post("/bulk", upload.single('file'), bulkUploadExams);

export default router;