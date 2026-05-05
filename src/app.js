const express = require("express");
const app = express();
const connectDB = require("./config/database");

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
