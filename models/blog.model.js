const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    }
});

let blogModel = mongoose.model('Blog', blogSchema);
module.exports = {blogModel}