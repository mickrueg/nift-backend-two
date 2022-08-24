// Require
const mongoose = require('../db/connection')

// Schema(s)
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

// Instantiate the model and give it a name
const User = mongoose.model('User', UserSchema)

// Export the model
module.exports = User