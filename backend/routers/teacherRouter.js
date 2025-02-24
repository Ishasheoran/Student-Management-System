import express from "express"
// import TeacherController from '../controller/TeacherController.js';
import {createTeacher, getAllTeachers,loginTeacher} from "../controller/teacherController.js"
const router=express.Router();
router.get('/getall',getAllTeachers);
router.post('/',createTeacher);

router.post("/login", loginTeacher);
export default router;