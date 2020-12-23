const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    name: {
type: String,
required: true
    },
    subscriberToChannel: {
        type: String,
        required: true
    },
    subscribeDate: {
type: Date,
require: true,
default: Date.now 
    }
});

module.exports = mongoose.model('Subcriber', subscriberSchema); // mongoose.model has 2 parameters:
                                                         //  the name of the model and its Schema - here the model is a defined Subscriber 