const connection = require('../dbConfig');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Article = new Schema({
    article_id: {
        type: String,
        required : true,
        unique: true
    },
    author_id: {
        type: String,
        required : true,
    },
    title: {
        type: String,
        required : true,
    },
    body: {
        type: String,
        maxlength: 200,
        minlength: 10,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

Article.index({
    "article_id":1
})

module.exports = connection.model("articles", Article);