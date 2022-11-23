const router = require('express').Router()
const Blog = require('../models/Blog')
const path = require('path')

router
    .get('/', async (req, res) => {
        const limitNumber = 5
        const blogs = await Blog.find({}).limit(limitNumber)
        res.render('pages/createBlog', {
            title: 'Create Blog',
            name: req.user.name,
            blogs,
        })
    })

    .post('/', async (req, res) => {
        let { title, content, name, image, imageUploadFile, uploadPath } =
            req.body

        if (!title || !content || !name || !req.files)
            return res.send(
                'Please fill in the required or No files were uploaded',
            )
        imageUploadFile = req.files.image
        image = imageUploadFile.name

        uploadPath = require('path').resolve('./') + '/public/uploads/' + image

        imageUploadFile.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err)
        })
        const newBlog = new Blog({ title, content, name, image })

        newBlog
            .save()
            .then(() => {
                res.redirect('/index')
            })
            .catch((err) => console.log(err))
    })

module.exports = router
