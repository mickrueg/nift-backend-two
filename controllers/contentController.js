// Require Express module
const express = require('express')
// instantiate a router -- this will hold all the logic
// for the URLs + methods for this resource
const router = express.Router()
// Import models
const Article = require('../models/Article')
const NFT = require('../models/NFT')
const User = require('../models/User')
// Import password protection hashing
const bcrypt = require('bcrypt')

// ***** ROUTES *****

// Following CRUD basic guidelines

// Get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (err) {
        next(err)
    }
})

// Export routes
module.exports = router
