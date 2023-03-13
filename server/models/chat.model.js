const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
    users: Array
}, { timestamps: true, });

module.exports = mongoose.model("Chat", ChatSchema);