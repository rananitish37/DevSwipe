const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/User");

app.use(express.json())

app.post("/signup",async (req,res)=>{

    const user = new User(req.body);

    await user.save()
    res.status(200).send("Data saved successfully in database")
})

app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;
    console.log(userEmail)
    try {
        const user = await User.findOne({emailId: userEmail})
        if(!user){
            res.status(401).send("User not found")
        }else{
            res.send(user)
        }
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

app.get("/feed",async (req,res)=>{
    try {
        const users = await User.find({})
        if(users.length ===0){
            res.status(401).send("User not found")
        }else{
            res.send(users)
        }
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

connectDB()
  .then(() => {
    console.log("Database connection establish...");
    app.listen(7777, () => {
      console.log("Server running on port no: 7777");
    });
  })
  .catch((err) => {
    console.error("Database connection not established!!", err);
  });
