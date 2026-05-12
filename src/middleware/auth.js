const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async (req,res,next)=>{
    try {
        const cookie = req.cookies;
        const {token} = cookie;
        if(!token){
            throw new Error("Please try login again")
        }
        const decode = jwt.verify(token,"DEV@swipe1309");
        const user = await User.findById(decode._id)
        if(!user){
            throw new Error("User not found")
        }
        req.user = user;
        next();
    } catch (error) {
        res.send("Unathorized access")
    }
}

module.exports={
    userAuth,
}