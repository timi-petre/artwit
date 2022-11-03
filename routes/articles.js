const express = require('express')
const Article = require('../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('pages/articles/new', {
        article: new Article(),
        title: 'Article Page',
        name: 'w',
        layout: './layouts/articles-width.ejs',
    })
})

router.get('/:id', async (req, res) => {
    let article = await Article.findById(req.params.id)
    if (article == null) res.redirect('/')
    res.render('pages/articles/show', {
        articles: article,
        layout: './layouts/articles-width.ejs',
    })
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    try {
        article = await article.save()
        res.redirect(`articles/${article.id}`)
    } catch (e) {
        // console.log(e)
        res.render('pages/articles/new', {
            article: article,
            title: 'New Article Page',
            name: 'w',
            layout: './layouts/articles-width.ejs',
        })
    }
})

module.exports = router
