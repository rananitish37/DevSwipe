const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/User");
const {userSignupValidation} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const {userAuth} = require("./middleware/auth")

app.use(express.json());
app.use(cookieParser()); // this is need as we needed express.json() to parse the data so that we can see it cookie-parser is also used to parse the cookie so that we can get it exact instead of undefined

app.post("/signup", async (req, res) => {
    const {firstName, lastName, emailId, password} = req.body;
  try {
    userSignupValidation(req);

    const encPassword =await bcrypt.hash(password,10);
    const user = new User({
        firstName,
        lastName,
        emailId,
        password:encPassword,
    });

    await user.save();
    res.status(200).send("Data saved successfully in database");
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
});

app.post("/login", async (req,res)=>{
    const {emailId, password} = req.body;

    try{
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error(" Invalid credential")
        }
        const validUser =await user.validatePassword(password);
        const token =await user.getJWT();
        
        if(validUser){
            
            res.cookie("token",token)
            res.send("Logged in Successfully!")
        }else{
            throw new Error(" Invalid credential")
        }
    }catch (err) {
    res.status(401).send("Error: " + err.message);
  }
})

app.get("/profile",userAuth, async (req,res)=>{
    try{
        res.send(req.user)
    }catch (err) {
    res.status(401).send("Error: "+err);
  }
})


app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(401).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(401).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//delete api
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    //await User.findByIdAndDelete({_id: userId}) this will work as well
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//patch(update the data)
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    // const user = await User.findByIdAndUpdate(userId,data,{returnDocument: "after"}) this last argument is option and it returns the object(data) after update or say new data
    // const user = await User.findByIdAndUpdate(userId,data,{returnDocument: "before"}) in this it will return the old data from db
    // Bydefault it is before so will return old data

    const ALLOWED_UPDATES = [,"age","gender","photoUrl","skills","about"]
    const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed){
        throw new Error("These data are not allowed to update")
    }
    if(data?.skills.length > 10){
        throw new Error("Skills can not be more than 10")
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
      runValidators: true,
    });
    //we have added runValidator because the validator funtion written inside user model will only run during creation of user so to make it run even when we update we need to call it explicitly
    console.log(user);
    res.send("Data updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong: "+error.message);
  }
});

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
