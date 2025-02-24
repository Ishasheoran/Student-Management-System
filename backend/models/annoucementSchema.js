import mongoose from "mongoose";
const annoucementSchema=new mongoose.Schema({
    Annoucement:{
        type:String,
        required:true
    },
    
});
const Annoucement=mongoose.model('Annoucement',annoucementSchema);
export default Annoucement;