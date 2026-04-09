const mongoose=require("mongoose");
require("dotenv").config();

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected fuck ramo");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}     
module.exports=connectDB;