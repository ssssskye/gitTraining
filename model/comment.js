const connection = require('../dbConfig');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = new Schema({
    comment_id: {
        type: String,
        required : true,
        unique: true
    },
    article_id: {
        type: String,
        required : true
    },
    commentAuthor_id: {
        type: String,
        required : true,
    },
    content: {
        type: String,
        required : true,
        maxlength: 200,
        minlength: 10,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

Comment.index({
    "commentAuthor_id":1
})

module.exports = connection.model("Comment", Comment);