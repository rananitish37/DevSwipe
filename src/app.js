const express = require("express")

const app = express()


//send this response even if url is different
/*app.use((req,res) =>{
    res.send("Response from server")
})*/


// app.use("/home",(req,res)=>{
//     res.send("This is home page")
// });
// app.use("/contact",(req,res)=>{
//     res.send("This is contact page")
// });
// app.use("/",(req,res)=>{
//     res.send("This is main page")
// });

app.get("/user",(req,res)=>{
    res.send({firstname:"nitish", lastname:"rana"});
});
app.post("/user",(req,res)=>{
    res.send("Saved the data to database successfully");
});
app.delete("/user",(req,res)=>{
    res.send("User deleted from database");
});

app.listen(7777,()=>{
    console.log("Server running on port no: 7777")
})