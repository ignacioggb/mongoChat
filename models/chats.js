
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    sender: String,
    message: String//,
//    task: String,
//    month:Number,
//    day:Number,
//    hours:Number,
//    minutes:Number
});

const Book = mongoose.model("Chat", chatSchema);

module.exports = Chat;
