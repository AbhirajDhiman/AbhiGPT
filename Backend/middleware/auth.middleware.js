const jwt=require("jsonwebtoken");
const tokenblacklistmodel=require("../models/blacklist.model");
async function authuser(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized, token not found"});
    }
    const istokenblacklisted=await tokenblacklistmodel.findOne({token});
    if(istokenblacklisted){
        return res.status(401).json({message:"Unauthorized, token is blacklisted"});
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized, invalid token"});
    }
}

module.exports={authuser};