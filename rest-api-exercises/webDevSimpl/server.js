// https://www.youtube.com/watch?v=fgTGADljAeg

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

const app = express(); // Activate Express Object

// Connect to DataBase (MongoDB)
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => console.log("Connected to Database"));
db.on("error", (error) => console.log(error));

app.use(express.json()); //Middleware - Let this server to accept and read json

// ROUTES

//Getting all subscribers

app.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one subscriber
app.get("/subscribers/:id", getSubscriber, (req, res) => {
  res.send(res.subscriber);
});

// Creating one subscriber
app.post("/subscribers", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscriberToChannel: req.body.subscriberToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one subscriber

app.patch("/subscribers/:id", getSubscriber, async (req, res) => {
  if ((req.body.name = !null)) { // if the user sent us a name (isnt 0)    
    console.log(req.body.name);
    res.subscriber.name = req.body.name; // assign the new name to the old one
  }
  if ((req.body.subscriberToChannel = !null)) {
    res.subscriber.subscriberToChannel = req.body.subscriberToChannel;
  }
  try {
    const updateSubscriber = await res.subscriber.save();
    res.json(updateSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one subscriber

app.delete("/subscribers/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Delete subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Middleware Function to get the subscriber by ID
let subscriber; // set subscriber undefined
async function getSubscriber(req, res, next) {
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "cannot find subscriber" });
    }
  } catch {
    return res.status(500).json({ message: err.message }); // ??
  }
  res.subscriber = subscriber;
  next();
}

// Connect to Port
app.listen(5000, () => console.log("Server Started"));
