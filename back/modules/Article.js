const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    paragraph:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model("Article", ArticleSchema); 