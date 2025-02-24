// import express from "express"
// // import ExamController from '../controller/ExamController.js';
// import {createExam,getAllExams} from "../controller/examController.js"
// const router=express.Router();
// router.get('/getall',getAllExams);
// router.post('/',createExam);
// export default router;

// import express from "express";
// import { getAllExams, addOrUpdateExam } from "../controller/examController.js";  // ✅ Make sure both are correctly imported

// const router = express.Router();

// router.get("/getall", getAllExams);
// router.post("/", addOrUpdateExam);

// export default router;

import express from "express";
import { getAllExams, addOrUpdateExam,getStudentExamResults } from "../controller/examController.js";  // ✅ Import correctly

const router = express.Router();

router.get('/getall', getAllExams);
router.post('/', addOrUpdateExam);
router.get("/student", getStudentExamResults);
// router.get('/student', getStudentExams); 
export default router;

