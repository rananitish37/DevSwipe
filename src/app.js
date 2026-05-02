const express = require("express")

const app = express()



app.use((req,res) =>{
    res.send("Response from server")
})

app.listen(7777,()=>{
    console.log("Server running on port no: 7777")
})