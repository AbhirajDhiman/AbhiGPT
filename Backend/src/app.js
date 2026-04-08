const express=require("express");
const app=express();
const cookie=require("cookie-parser"); //to access cookies in request object

app.use(express.json());
app.use(cookie());
//require all routes here
const authroutes=require("../routes/auth.route");
app.get("/",(req,res)=>{
    res.send("Hello World");
}); 
//using all the routes here
app.use("/api/auth",authroutes);

module.exports=app;