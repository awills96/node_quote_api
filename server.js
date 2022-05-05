const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT)

app.get('/api/quotes/random', (req, res, next) => {
    quoteObj = getRandomElement(quotes);
    res.send({
        quote: quoteObj
    })
})

app.get('/api/quotes', (req, res, next) => {
    if (!req.query.person){
        res.send({
            quotes: quotes
        });
    } else {
        let result = quotes.filter(quote => quote.person === req.query.person)
        res.send({
            quotes: result
        })
    }
});

app.post('/api/quotes', (req, res, next) => {
    if (req.query.quote && req.query.person){
        quotes.push(req.query);
        res.send({
            quote: req.query
        })
    } else {
        res.status(400).send();
    }
});