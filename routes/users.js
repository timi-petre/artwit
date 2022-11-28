const router = require('express').Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const { notAuthenticate } = require('../config/auth')

const User = require('../models/User')

router.get('/login', notAuthenticate, (req, res) => {
    res.render('pages/users/login', {
        layout: './layouts/sign-layout.ejs',
        title: 'Login',
    })
})

router.get('/register', notAuthenticate, function (req, res) {
    res.render('pages/users/register', {
        layout: './layouts/sign-layout.ejs',
        title: 'Register',
    })
})

router.post('/register', notAuthenticate, (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' })
    }

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' })
    }

    if (password.length < 6) {
        errors.push({ msg: 'Passwords should be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('pages/users/register', {
            errors,
            name,
            email,
            password,
            password2,
            layout: './layouts/sign-layout.ejs',
        })
    } else {
        User.findOne({ email: email }).then((user) => {
            if (user) {
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

                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw errors

                        newUser.password = hash

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

router.post('/login', notAuthenticate, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next)
})

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
