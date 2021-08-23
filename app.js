const express = require('express')
const app = express()
const nunjucks = require('nunjucks')

let port = 7999;

nunjucks.configure('app/views', {
    express: app
});

app.set('view engine', 'njk');

app.get('/mvp', async (req, res) => {
    res.render('mvp')
});

app.listen(port, function() {
    console.log('Express started')
 });