const mongoose=require("mongoose");
const blacklistToken=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be added in the blacklist"]
    }
},{
    timestamps:true
});

const tokenblacklistmodel=mongoose.model("blacklisttoken",blacklistToken);

module.exports=tokenblacklistmodel;
