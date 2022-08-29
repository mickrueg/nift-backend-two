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
const { request } = require('express')
const { createUserToken } = require('../middleware/auth');


// ***** ROUTES *****

// Following CRUD basic guidelines

// Create new User
router.post('/user', async (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        // return a new object with the hashed password
        .then(hash=>
            ({
                username: req.body.username,
                password: hash
              })
            )
        // create user with provided username and hashed password
        .then(user => User.create(user))
        // send the new user object back with status 201, but `hashedPassword`
        // won't be sent because of the `transform` in the User model
        .then(user => res.status(201).json(user))
        // pass any errors along to the error handler
        .catch(next);
    })

// Save new Article by passing in user and article link to req.body
router.post('/article', async (req, res, next) => {
    try {
        const saveArticle = await Article.create(req.body)
        res.json(saveArticle)
    } catch (err) {
        next(err)
    }
})

// Save new NFT by passing in user and article link to req.body
router.post('/nft', async (req, res, next) => {
    try {
        const saveNFT = await NFT.create(req.body)
        res.json(saveNFT)
    } catch (err) {
        next(err)
    }
})

// Get all users
router.get('/users', async (req, res, next) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (err) {
        next(err)
    }
})

//GET Articles
router.get('/articles/:id', async (req, res, next) => {
    try {
        const articles = await Article.find({
            user: req.params.id
        })
        res.json(articles)
    } catch (err) {
        next(err)
    }
})

// Get user object by username
router.get('/:id', async (req, res, next) => {
    try {
        const userData = await User.find({
            username: req.params.id
        })
        res.json(userData)
    } catch (err) {
        next(err)
    }
})

// Get all user's saved NFTs by passing in user id into req.body
router.get('/nfts/:id', async (req, res, next) => {
    try {
        const nfts = await NFT.find({
            user: req.params.id
        })
        res.json(nfts)
    } catch (err) {
        next(err)
    }
})


// Delete user
router.delete('/:id', async (req, res, next) =>  {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.json(deleteUser)
    } catch (err) {
        next(err)
    }
})
// Delete saved Article by id
router.delete('/article/:id', async (req, res, next) =>  {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id)
        res.json(deletedArticle)
    } catch (err) {
        next(err)
    }
})

// Delete saved NFT by id
router.delete('/nft/:id', async (req, res, next) =>  {
    try {
        const deleteNFT = await NFT.findByIdAndDelete(req.params.id)
        res.json(deleteNFT)
    } catch (err) {
        next(err)
    }
})


// SIGN IN
// POST /api/signin
router.post('/signin', (req, res, next) => {
	User.findOne({ username: req.body.username })
		// Pass the user and the request to createUserToken
		.then((user) => createUserToken(req, user))
		// createUserToken will either throw an error that
		// will be caught by our error handler or send back
		// a token that we'll in turn send to the client.
		.then((token) => res.json({ token }))
		.catch(next);
});

// Export routes
module.exports = router
