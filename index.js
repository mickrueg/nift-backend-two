// BASIC CONFIGURATION

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
require('./db/connection.js')
app.set('port', process.env.PORT || 8000)

// MIDDLEWARE

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors()) // This needs to only allow connection from front-end URL

// ROUTES

// CONTROLLERS

const contentController = require('./controllers/contentController')
app.use('/', contentController)

// HANDLE ERRORS

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).send(message)
})

// START SERVER

app.listen(app.get('port'), () => {
    console.log('on port: ', app.get('port'))
})