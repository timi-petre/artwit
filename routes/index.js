const express = require('express')
const Blog = require('../models/Blog')
const router = express.Router()

//Welcome Page
router.get('/', (req, res) => {
    res.render('pages/welcome', {
        title: 'Welcome',
        layout: './layouts/sign-layout.ejs',
    })
})

// Index Page
router.get('/index', async (req, res) => {
    const allBlogs = await Blog.find()
    res.render('pages/index', {
        title: 'All Blogs',
        blogs: allBlogs,
        name: req.user.name,
    })
})

//About Page
router.get('/about', (req, res) => {
    res.render('pages/about', {
        title: 'About',
        name: req.user.name,
    })
})

// Dashboard Page
router.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', {
        title: 'Dashboard',
        name: req.user.name,
        email: req.user.email,
    })
})

module.exports = router
