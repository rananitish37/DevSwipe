const mongoose = require("mongoose")

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
    },
    password: {
        type: String,
        required:true,
        minLength: 10,
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
        default:"https://www.abasynisb.edu.pk/storage/faculty/26_1767084224.jpg"
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