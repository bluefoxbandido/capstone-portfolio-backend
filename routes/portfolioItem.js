const express = require('express');
const router = express.Router();
const PortfolioItem = require('../models/portfolioItem');

router.get('/all', (req, res) => {
    PortfolioItem.find()
        .then(portfolioItems => res.json(portfolioItems))
        .catch(err => res.status(400).json('Get all error serverside' + err))
})

router.get('/:id', (req, res) => {
    PortfolioItem.findById(req.params.id)
        .then(portfolioItem => res.json(portfolioItem))
        .catch(err => res.status(400).json('Error getting individual' + err))
})

router.post('/create', auth, (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const url = req.body.url;
    const blogUrl = req.body.blogUrl;

    const newPortfolioItem = new PortfolioItem({
        name,
        description,
        url,
        blogUrl
    });

    newPortfolioItem.save()
        .then(() => res.json('Portfolio Item Added'))
        .catch(err => res.status(400).json('Error adding item' + err))
})

router.patch('/:id', auth, (req, res) => {
    PortfolioItem.findById(req.params.id)
        .then(portfolioItem => {
            portfolioItem.name = req.body.name;
            portfolioItem.description = req.body.description;
            portfolioItem.url = req.body.url;
            portfolioItem.blogUrl = req.body.blogUrl;

            portfolioItem.save()
                .then(() => res.json('Portfolio Item Updated'))
                .catch(err => res.status(400).json('Error Saving' + err))
        })
        .catch(err => res.status(400).json('Error Updating' + err))
})

router.delete('/deletePortfolioItem/:id', auth, (req, res) => {
    PortfolioItem.findByIdAndDelete(req.params.id)
        .then(() => res.json('Portfolio item deleted'))
        .catch(err => res.status(400).json('Error deleting' + err))
})

module.exports = router;