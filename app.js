if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const passport = require('passport')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')

const app = express()
const port = process.env.PORT || 3000

require('./config/passport')(passport)

//Connect flash
app.use(flash())

const db = require('./config/keys').MongoURI

// Connect to Mongo
mongoose
    .connect(db, {})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))

//? Set Template Engine
app.use(expressLayouts)
app.set('views', './views')
app.set('view engine', 'ejs')

//? Layouts
app.set('layout', './layouts/default')

// BodyParser
app.use(express.urlencoded({ extended: false }))

//? Static Files

app.use(express.static('public'))
app.use(express.json())
app.use('/styles', express.static(__dirname + '/public/styles'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/img', express.static(__dirname + '/public/img'))

//Express Session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    }),
)

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

//?Import Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/create', require('./routes/create'))

//? Open Port 3000
app.listen(port, () =>
    console.log(`Server listening on port http://localhost:${port} !`),
)
