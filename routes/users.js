// const express = require('express')
// const router = express.Router()
// const bcrypt = require('bcrypt')
// const passport = require('passport')
// const flash = require('express-flash')
// const session = require('express-session')
// const methodOverride = require('method-override')

// const User = require('../models/User')

// const initializePassport = require('../passport-config')

// router.use(flash())
// router.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,
//     }),
// )

// router.use(passport.initialize())
// router.use(passport.session())
// router.use(methodOverride('_method'))

// initializePassport(
//     passport,
//     (email) => users.find((user) => user.email === email),

//     (id) => users.find((user) => user.id === id),
// )

// const users = []

// router.get('/users', checkAuthenticated, (req, res) => {
//     res.render('users', {
//         title: 'User Page',
//         name: req.user.name,
//     })
// })

// router.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('pages/user/login', {
//         title: 'Login Page',
//         layout: './layouts/sign-layout.ejs',
//     })
// })
// router.post(
//     '/login',
//     checkNotAuthenticated,
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/login',
//         failureFlash: true,
//     }),
// )

// router.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('pages/user/register', {
//         title: 'Register Page',
//         layout: './layouts/sign-layout.ejs',
//     })
// })

// router.post('/register', checkNotAuthenticated, async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         users.push({
//             id: Date.now().toString(),
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword,
//         })
//         res.redirect('login')
//     } catch {
//         res.redirect('register')
//     }
// })

// router.delete('/logout', (req, res) => {
//     req.logout(function (err) {
//         if (err) {
//             return next(err)
//         }
//         res.redirect('login')
//     })
// })

// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next()
//     }
//     res.redirect('login')
// }

// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/')
//     }
//     next()
// }

// module.exports = router
const router = require('express').Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const { notAuthenticate } = require('../config/auth')
//User model
const User = require('../models/User')

//Login Page
router.get('/login', notAuthenticate, (req, res) => {
    res.render('pages/users/login', {
        layout: './layouts/sign-layout.ejs',
        title: 'Login',
    })
})

//Register Page
router.get('/register', notAuthenticate, function (req, res) {
    res.render('pages/users/register', {
        layout: './layouts/sign-layout.ejs',
        title: 'Register',
    })
})

//Register Handle
router.post('/register', notAuthenticate, (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []

    //Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' })
    }

    //Check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' })
    }

    // Check passwords length
    if (password.length < 6) {
        errors.push({ msg: 'Passwords should be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
        })
    } else {
        //Validation passed
        User.findOne({ email: email }).then((user) => {
            if (user) {
                //User ALready Exists
                errors.push({ msg: 'Email is already registered' })
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                })
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                })

                //Hash Password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw errors
                        //Set password to hashed
                        newUser.password = hash
                        //Save User
                        newUser
                            .save()
                            .then((user) => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered!',
                                )
                                res.redirect('/users/login')
                            })
                            .catch((err) => console.log(err))
                    }),
                )
            }
        })
    }
})

//Login Handle
router.post('/login', notAuthenticate, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next)
})

//Logout Handle
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        req.flash('success_msg', 'You are now logged out!')
        res.redirect('/users/login')
    })
})

module.exports = router
