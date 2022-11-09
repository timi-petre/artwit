const router = require('express').Router()
const Blog = require('../models/Blog')

router
    .get('/', (req, res) => {
        res.render('pages/createBlog', {
            title: 'Create Blog',
            name: req.user.name,
        })
    })

    .post('/', (req, res) => {
        const { title, content, name } = req.body
        if (!title || !content || !name)
            return res.send('Please fill in the required')

        const newBlog = new Blog({ title, content, name })

        newBlog
            .save()
            .then(() => {
                res.redirect('/index')
            })
            .catch((err) => console.log(err))
    })

module.exports = router
