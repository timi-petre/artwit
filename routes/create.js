const router = require('express').Router()
const Blog = require('../models/Blog')

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

    .post('/', (req, res) => {
        let imageUploadFile, uploadPath
        let { title, content, name, newImageName } = req.body
        if (!req.files) {
            console.log('No files were uploaded')
        } else {
            imageUploadFile = req.files.image
            newImageName = imageUploadFile.name

            uploadPath = require('path') + './uploads/' + newImageName

            imageUploadFile.mv(uploadPath, function (err) {
                if (err) return res.status(500).send(err)
            })
        }

        if (!title || !content || !name)
            return res.send('Please fill in the required')

        const newBlog = new Blog({ title, content, name, newImageName })

        newBlog
            .save()
            .then(() => {
                res.redirect('/index')
            })
            .catch((err) => console.log(err))
    })

module.exports = router
