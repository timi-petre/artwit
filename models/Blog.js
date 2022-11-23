const mongoose = require('mongoose')
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        required: false,
    },
})

const Blog = mongoose.model('Blog', BlogSchema)
module.exports = Blog
