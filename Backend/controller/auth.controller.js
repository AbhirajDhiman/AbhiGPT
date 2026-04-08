const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const tokenblacklistmodel = require("../models/blacklist.model");

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
};

function createAuthToken(user) {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
}

/**
@name registeruser
@description register a new user,expects username and email to be unique, password is required
@access public 

*/
async function registeruser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            return res.status(400).json({
                message: "A user with the same username or email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = createAuthToken(user);
        res.cookie("token", token, COOKIE_OPTIONS);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
/**
@name login
@description login the existing user,expectes  email and password
@access public 

*/
async function loginuser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = createAuthToken(user);
        res.cookie("token", token, COOKIE_OPTIONS);

        return res.status(200).json({
            message: "User logged in Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function logoutuser(req,res){
    const{cookie}=req.cookies.token

    if(token){
            await tokenblacklistmodel.create({token:cookie});
            
        }
        res.clearCookie("token",COOKIE_OPTIONS);
        return res.status(200).json({message:"User logged out successfully"});
}

/**
@name getme
@description get the details of the currently logged-in user
@access private
 */
async function getme(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { registeruser, loginuser, logoutuser, getme };