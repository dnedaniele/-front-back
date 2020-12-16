const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log("connected to DB!");
  });
//ROUTES

// GET Home
app.get("/", (request, response) => {
  response.send("THIS IS HOME");
});

//POST
app.post("/test", (request, response) => {
  console.log(response.body);
  response.send("thanks for the request"); 
});

//Listen to the Server
app.listen(3500);
