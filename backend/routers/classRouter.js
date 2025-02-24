// import express from "express"
// // import ClassController from '../controller/ClassController.js';
// import {createClass, getAllClasses} from "../controller/classController.js"
// const router=express.Router();
// router.get('/getall',getAllClasses);
// router.post('/',createClass);
// export default router;


// import express from "express";
// import { createClass, getAllClasses } from "../controller/classController.js";

// const router = express.Router();

// router.get("/getall", getAllClasses);
// router.post("/", createClass);

// export default router;

// import express from "express";
// import { createStudent, getAllStudents } from "../controller/studentController.js"; // ✅ Ensure getAllStudents exists

// const router = express.Router();

// router.post("/add", createStudent); // ✅ Route for adding a student
// router.get("/getall", getAllStudents); // ✅ Route for getting all students

// export default router;

// import express from "express";
// import { createClass, getAllClasses } from "../controllers/classController.js";

// const router = express.Router();

// router.post("/", createClass); // ✅ POST request for creating a class
// router.get("/getall", getAllClasses); // ✅ GET request for fetching all classes

// export default router;
// import express from "express";
// import { createClass, getAllClasses } from "../controllers/classController.js";

// const router = express.Router();

// router.post("/", createClass);
// router.get("/getall", getAllClasses);

// export default router;
import express from "express";
import { createClass, getAllClasses } from "../controller/classController.js"; 

const router = express.Router();

router.post("/", createClass);
router.get("/getall", getAllClasses);

export default router;
