const express = require('express')
const router = express.Router()

// const { checkAuthenticated } = require('../config/auth')

// Index Page
router.get('/', (req, res) => {
    res.render('pages/articles/index')
})

//Welcome Page
router.get('/welcome', (req, res) => {
    res.render('welcome', {
        layout: './layouts/sign-layout.ejs',
        title: 'Welcome',
    })
})

//About Page
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: req.user.name,
    })
})

// Dashboard Page
router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        name: req.user.name,
        title: 'Dashboard',
    })
})

module.exports = router
