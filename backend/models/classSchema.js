
import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true }
   
});
const classSchema = new mongoose.Schema(
  {
    grade: {
      type: String,
      required: true,
    },
    Sem:{
      type:String,
      required:true
    },
    subjects: [subjectSchema],
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);
export default Class;
