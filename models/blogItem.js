const mongoose = require('mongoose');

const BlogItemSchema = new mongoose.Schema(
    {
        title: String,
        date: Date,
        body: String,
        gitUrl: String,
        languages: Array,
        frameworks: Array,
        libraries: Array

    }
)

module.exports = mongoose.model("BlogItem", BlogItemSchema)