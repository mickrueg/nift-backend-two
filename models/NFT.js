// Require
const mongoose = require('../db/connection')

// Schema(s)
const NFTSchema = new mongoose.Schema({
    user: String,
    NFT: String
})

// Instantiate the model and give it a name
const NFT = mongoose.model('NFT', NFTSchema)

// Export the model
module.exports = NFT