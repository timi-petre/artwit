if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const expressLayout = require('express-ejs-layouts')
const userRouter = require('./routes/users')
const articleRouter = require('./routes/articles')

const app = express()
const port = process.env.PORT || 3000

//? Set Template Engine
app.set('layout', './layouts/sign-layout.ejs')
app.set('layout', './layouts/full-width')
app.set('views', './views')
app.set('view engine', 'ejs')

//? Static Files
app.use(expressLayout)
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.json())
app.use('/styles', express.static(__dirname + '/public/styles'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/img', express.static(__dirname + '/public/img'))

//? MongoDB

const mongoose = require('mongoose')
mongoose
    .connect('mongodb://localhost:3000/artblog')
    .then(() => {
        console.log('Connected')
    })
    .catch((e) => {
        console.log('Something went wrong', e)
    })

//? Navigation
app.get('/', (req, res) => {
    const articles = [
        {
            title: 'First Article',
            createdAt: new Date(),
            createdBy: 'test1',
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
        {
            title: 'Second Article',
            createdAt: new Date(),
            createdBy: 'test2',
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        },
    ]
    res.render('pages/articles/index', {
        title: 'Home Page',
        name: 'w',
        articles: articles,
        layout: './layouts/full-width.ejs',
    })
})

//?Import Routes
app.use('/', userRouter)
app.use('/', articleRouter)

//? Open Port 3000
app.listen(port, () =>
    console.log(`Artblog app listening on port http://localhost:${port} !`),
)
