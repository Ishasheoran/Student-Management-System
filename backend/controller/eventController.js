import Event from "../models/eventSchema.js"
// import Student from "../models/studentSchema.js";
import {handleValidationError} from "../middlewares/errorHandler.js"
export const createEvent=async(req,res,next)=>{
    console.log(req.body);
    const {events}=req.body;
    try{
        if(!events){
// return next("please fill form",400);
handleValidationError("Please fill out all required fields", 400);
        }
        await Student.create({events});
        res.status(200).json({
            success:true,
            message:"Event is  Created",
        });
    }
    catch(err){
next (err);
    }
};
export const getAllEvents=async(req,res,next)=>{
    try{
        const event=await Events.find();
        res.status(200).json({
            success:true,
            event,
        })
    }
    catch(err){
        next(err)
    }
}