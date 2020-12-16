const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());  
//ROUTES

// GET Home
app.get("/", (req, res) => {
    res.send("THIS IS HOME");
  });

  //POST
  app.post("/test", )



//Listen to the Server
app.listen(3500);
