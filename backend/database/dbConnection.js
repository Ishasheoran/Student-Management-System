// import mongoose from "mongoose";

// export const dbConnection=()=>{
//     mongoose.connect(process.env.MONGO_URL,{
//         dbName:""
//     })
//     .then(()=>{
//         console.log("connected to database")
//     })
//     .catch((error)=>{
//         console.log("error while connecting")
//     });
// };


import mongoose from "mongoose";
import { config } from "dotenv";

config();

const dbServerUrl = process.env.MONGODB_URI;

export const dbConnection = async () => {
  try {
    await mongoose.connect(dbServerUrl);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from the database");
  });
};
