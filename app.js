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
const port = process.env.PORT

require('./config/passport')(passport)

app.use(flash())

const db = require('./config/keys').MongoURI

mongoose
    .connect(db, {})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))

app.use(expressLayouts)
app.set('views', './views')
app.set('view engine', 'ejs')

app.set('layout', './layouts/default')

app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))
app.use(express.json())

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    }),
)

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/create', require('./routes/create'))
app.use(require('./routes/blog'))

app.listen(port, () =>
    console.log(`Server listening on port http://localhost:${port} !`),
)
