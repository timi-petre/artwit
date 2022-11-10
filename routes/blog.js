const router = require('express').Router()
const Blog = require('../models/Blog.js')

router
    .get('/blog/:id', async (req, res) => {
        const { id } = req.params

        const getBlog = await Blog.findOne({ _id: id })

        res.render('pages/particularBlog', {
            blog: getBlog,
            // title: 'Blogs',
            name: req.user.name,
            layout: './layouts/default.ejs',
        })
    })

    .get('/delete/:id', (req, res) => {
        const { id } = req.params
        Blog.deleteOne({ _id: id })
            .then(() => {
                console.log('Deleted blog succesfully')
                res.redirect('/index')
            })
            .catch((err) => {
                console.log(err)
            })
    })

    .get('/edit/:id', async (req, res) => {
        const { id } = req.params

        const getData = await Blog.findOne({ _id: id })
        res.render('pages/editBlog', {
            blog: getData,
            title: 'Blogs Edit',
            name: req.user.name,
        })
    })

    .post('/edit/:id', (req, res) => {
        const { id } = req.params
        const { title, content, name } = req.body

        Blog.updateOne({ _id: id }, { title, content, name })
            .then(() => {
                console.log('Succesfully updated the blog')
                res.redirect('/index')
            })
            .catch((err) => console.log(err))
    })

module.exports = router
