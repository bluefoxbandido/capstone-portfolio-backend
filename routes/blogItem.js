const express = require('express');
const router = express.Router();
const Blog = require('../models/blogItem');

router.get('/all', (req, res) => {
    Blog.find()
        .then(blogItems => res.json(blogItems))
        .catch(err => res.status(400).json(err))
    })

router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => res.json(blog))
        .catch(err => res.status(400).json(err))
})

router.post('/create', (req, res) => {
    const title = req.body.title;
    const date = req.body.date;
    const body = req.body.body;
    const gitUrl = req.body.gitUrl;
    const languages = req.body.languages;
    const frameworks = req.body.frameworks;
    const libraries = req.body.libraries;

    const newBlog = new Blog({
        title,
        date,
        body,
        gitUrl,
        languages,
        frameworks,
        libraries
    });

    newBlog.save()
        .then(() => res.json('Blog Item Added'))
        .catch(err => res.status(400).json(err))


})

module.exports = router;