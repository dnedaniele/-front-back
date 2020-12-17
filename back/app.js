const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Article = require("./modules/Article"); 
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
app.post("/test", async (request, response) => {
  const article = new Article({
title: request.body.title,
paragraph: request.body.paragraph
  }); 
  try {
      const savedArticle = await article.save();
      response.json(savedArticle);
  }catch(err) {
      response.json({message: err});
  }

});

//Listen to the Server
app.listen(3500);
