const express = require('express')
const Blog = require('../models/Blog')
const router = express.Router()

const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session')

const User = require('../models/User')
require('../config/passport')(passport)

router.use(flash())
router.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }),
)
router.use(passport.initialize())
router.use(passport.session())

// Index Page
router.get('/index', authenticate, async (req, res) => {
    const allBlogs = await Blog.find()
    res.render('pages/index', {
        title: 'All Blogs',
        blogs: allBlogs,
        name: req.user.name,
    })
})

//Welcome Page
router.get('/', notAuthenticate, (req, res) => {
    res.render('pages/welcome', {
        title: 'Welcome',
        layout: './layouts/sign-layout.ejs',
    })
})

// Dashboard Page
router.get('/dashboard', authenticate, (req, res) => {
    res.render('pages/dashboard', {
        title: 'Dashboard',
        name: req.user.name,
        email: req.user.email,
    })
})

function authenticate(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error_msg', 'Please log in to view this page')
    res.redirect('/users/login')
}

function notAuthenticate(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/index')
    }
    next()
}
module.exports = router
