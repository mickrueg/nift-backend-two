// Require
const mongoose = require('../db/connection')

// Schema(s)
const ArticleSchema = new mongoose.Schema({
    user: String,
    article: String
})

// Instantiate the model and give it a name
const Article = mongoose.model('Article', ArticleSchema)

// Export the model
module.exports = Article