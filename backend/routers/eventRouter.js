import express from "express"
// import studentController from '../controller/studentController.js';
import {createEvent, getAllEvents} from "../controller/eventController.js"
const router=express.Router();
router.get('/getall',getAllEvents);
router.post('/',createEvent);
export default router;