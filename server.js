var mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');

const PortfolioItem = require('./models/portfolioItem');
const user = require('./routes/user');
const app = express();

require('dotenv').config();

app.use(express.json())
app.use(cors());


const dbRoute = process.env.MONGODB_MAUVE_URI
mongoose.connect(dbRoute, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});


let db = mongoose.connection;

db.once('open', () => console.log('Connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));



app.get('/', (req, res) => {
    res.send('Test Passed. Connected to Express API')
})

app.get('/portfolioItems', (req, res) => {
    PortfolioItem.find()
        .then(portfolioItems => res.json(portfolioItems))
        .catch(err => res.status(400).json('app.get Error GET ALL: ' + err));
});

app.get('/portfolioItem/:id', (req, res) => {
    PortfolioItem.findById(req.params.id)
        .then(portfolioItem => res.json(portfolioItem))
        .catch(err => res.status(400).json('Error GETTING ONE : ' + err));
})

app.post('/createPortfolioItem', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const url = req.body.url;
    const imageUrl = req.body.imageUrl;
    
    const newPortfolioItem = new PortfolioItem({
        name,
        description,
        url,
        imageUrl
    });

    newPortfolioItem.save()
        .then(() => res.json('Portfolio Item Added'))
        .catch(err => res.status(400).json('Error creating item: ' + err));
});

app.delete('/deletePortfolioItem/:id', (req, res) => {
    PortfolioItem.findByIdAndDelete(req.params.id)
        .then(() => res.json('Portfolio Item Deleted'))
        .catch(err => res.status(400).json('Error DELETING: ' + err));
});

app.put('/portfolioItem/:id', (req, res) => {
    PortfolioItem.findById(req.params.id)
        .then(portfolioItem => {
            portfolioItem.name = req.body.name;
            portfolioItem.description = req.body.description;
            portfolioItem.url = req.body.url;
            portfolioItem.imageUrl = req.body.imageUrl;

            portfolioItem.save()
            .then(() => res.json('PortfolioItem updated!'))
            .catch(err => res.status(400).json('Error UPDATING :' + err));
        })
        .catch(err => res.status(400).json('Error UPDATING :' + err));
})

app.use('/user', user);

// PORT
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`));
