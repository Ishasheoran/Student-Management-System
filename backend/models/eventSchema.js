import mongoose from "mongoose";
const eventSchema=new mongoose.Schema({
   events:{
        type:String,
        required:true
    },
    
});
const Event=mongoose.model('Events',eventSchema);
export default Event;