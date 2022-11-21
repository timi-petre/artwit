const router = require('express').Router()
const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session')

require('./passport')(passport)

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

module.exports = {
    authenticate(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', 'Please log in to view this page')
        res.redirect('/login')
    },

    notAuthenticate(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/index')
        }
        next()
    },
}
