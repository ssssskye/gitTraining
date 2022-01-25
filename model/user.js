const connection = require('../dbConfig');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    user_id: {
        type: String,
        required : true,
        unique: true
    },
    name: {
        type: String,
        required : true,
    },
    createDate: {
        type: Date,
        default: Date.now

    }
});

User.index({
    "author_id":1
})

module.exports = connection.model("User", User);