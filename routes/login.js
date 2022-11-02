const router = require('express').Router()
router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' })
})
router.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

router.get('/login', (req, res) => {
    res.render('login.ejs', {
        name: 'kyle',
        title: 'Login Page',
        layout: './layouts/login.ejs',
    })
})

module.exports = router
