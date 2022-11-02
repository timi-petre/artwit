const express = require('express')
const expressLayout = require('express-ejs-layouts')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

//? Set Template Engine
app.use(expressLayout)
app.set('layout', './layouts/sign-layout.ejs')
app.set('layout', './layouts/full-width')
app.set('views', './views')
app.set('view engine', 'ejs')

//? Static Files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/styles', express.static(__dirname + '/public/styles'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/img', express.static(__dirname + '/public/img'))

//? Navigation

//?Import Routes
const userRouter = require('./routes/routes')
app.use('/', userRouter)

//? Open Port 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
