import express from "express"
// import AnnoucementController from '../controller/AnnoucementController.js';
import {createAnnoucement, getAllAnnoucements} from "../controller/annoucementController.js"
const router=express.Router();
router.get('/getall',getAllAnnoucements);
router.post('/',createAnnoucement);
export default router;