const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required:true,
        unique:true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not a valid email")
            }
        },
    },
    password: {
        type: String,
        required:true,
        minLength: 10,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please make a string password")
            }
        },
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default:"https://www.abasynisb.edu.pk/storage/faculty/26_1767084224.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Please enter a valid Url")
            }
        },
    },
    skills: {
        type: [String],
    },
    about: {
        type: String,
        default: "This is a default description about user"
    }
},
{
    timestamps:true,
})

const User = mongoose.model("User", userSchema);
module.exports = User;