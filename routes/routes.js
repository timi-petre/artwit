const router = require('express').Router()
const bcrypt = require('bcrypt')
const users = []
router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', name: 'kyle' })
})
router.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

router.get('/login', (req, res) => {
    res.render('login.ejs', {
        title: 'Login Page',
        layout: './layouts/sign-layout.ejs',
    })
})
router.post('/login', (req, res) => {})

router.get('/register', (req, res) => {
    res.render('register.ejs', {
        title: 'Register Page',
        layout: './layouts/sign-layout.ejs',
    })
})

router.post('/register', async (req, res) => {
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
    console.log(users)
})

module.exports = router
