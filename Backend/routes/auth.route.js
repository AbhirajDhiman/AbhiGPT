const { Router } = require("express");
const authcontroller = require("../controller/auth.controller");
const authrouter = Router();
const authmiddleware=require("../middleware/auth.middleware");
/**
@route POST /api/auth/register
@description register a new user
@access public
 */

authrouter.post("/register",authcontroller.registeruser);
/**
@route POST /api/auth/login
@description login an existing user
@access public
 */
authrouter.post("/login",authcontroller.loginuser);
/**
@route POST /api/auth/logout
@description clear token from user cookie and add token in blacklist
@access public
 */

authrouter.post("/logout",authcontroller.logoutuser);

/**
 * @route GET /api/auth/profile
 * @description get the profile of the logged in user,expects token in cookie
 * @access private
 */
authrouter.get("/getme",authmiddleware.authuser   ,authcontroller.getme);

module.exports = authrouter;