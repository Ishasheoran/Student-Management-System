// import express from "express"
// // import AttendanceController from '../controller/AttendanceController.js';
// import {markAttendance, getAllAttendances} from "../controller/attendanceController.js"
// const router=express.Router();
// router.get('/getall',getAllAttendances);
// router.post('/',markAttendance);
// export default router; 

import express from "express";
import { markAttendance,getAllAttendances,getStudentAttendance } from "../controller/attendanceController.js";

const router = express.Router();

router.get("/getall", getAllAttendances);
router.post("/", markAttendance);
// router.get("/grade/:grade", getStudentsByGrade); 

router.get('/student', getStudentAttendance);
export default router;

