//Tutorial link https://www.youtube.com/watch?v=K1MrcnfSX2s&t=939s 

const express = require("express");
const mongoose = require("mongoose"); 
require("dotenv").config();

//Routes

const postsRoutes = require("./routes/api/posts");

const app = express();

// BodyParser Middleware

app.use(express.json());

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
})
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/posts", postsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server run at port ${PORT}`));

