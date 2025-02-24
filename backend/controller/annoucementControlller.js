import Annoucement from "../models/annoucementSchema.js"
// import Annoucement from "../models/AnnoucementSchema.js";
import {handleValidationError} from "../middlewares/errorHandler.js"
export const createAnnoucement=async(req,res,next)=>{
    console.log(req.body);
    const {announcement}=req.body;
    try{
        if(!announcement){
// return next("please fill form",400);
handleValidationError("Please fill out all required fields", 400);
        }
        await Annoucement.create({announcement});
        res.status(200).json({
            success:true,
            message:"Annoucement Created",
        });
    }
    catch(err){
next (err);
    }
};
export const getAllAnnoucements=async(req,res,next)=>{
    try{
        const annoucements=await Annoucement.find();
        res.status(200).json({
            success:true,
            annoucements,
        })
    }
    catch(err){
        next(err)
    }
}