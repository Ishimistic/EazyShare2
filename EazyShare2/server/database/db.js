import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config({path: "./env"});

const DBConnection = async () => {
     const DB = process.env.DB;
   
    if (!DB) {
        console.error("MONGODB_URL is not defined in the environment variables");
        return;
    }

    try{
       await mongoose.connect(DB);
        console.log("Database connected successfully!");

    }catch(err){
        console.log("Error while connecting with the database: ", err.message);
    }
}

export default DBConnection;