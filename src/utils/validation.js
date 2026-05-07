const validator = require("validator")

const userSignupValidation = (req)=>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("firstName and lastName is required")
    }else if(firstName.length < 4 || firstName >50){
        throw new Error("first name should be of length 4 - 50")
    }else if(lastName.length < 4 || lastName >50){
        throw new Error("last name should be of length 4 - 50")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid please enter valid email")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong please enter a strong password")
    }
}

module.exports = {
    userSignupValidation,
}