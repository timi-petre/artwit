if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const router = require('express').Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('../passport-config')
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
router.use(methodOverride('_method'))

initializePassport(
    passport,
    (email) => users.find((user) => user.email === email),
    (id) => users.find((user) => user.id === id),
)

const users = []
router.get('/', checkAuthenticated, (req, res) => {
    res.render('index', { title: 'Home Page', name: req.user.name })
})
router.get('/about', checkAuthenticated, (req, res) => {
    res.render('about', {
        title: 'About',
        name: req.user.name,
    })
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs', {
        title: 'Login Page',
        layout: './layouts/sign-layout.ejs',
    })
})
router.post(
    '/login',
    checkNotAuthenticated,
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    }),
)

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs', {
        title: 'Register Page',
        layout: './layouts/sign-layout.ejs',
    })
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

router.delete('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('/login')
    })
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

module.exports = router
