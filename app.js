const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const axios = require('axios');

let port = 7999;

nunjucks.configure('app/views', {
    express: app
});

app.set('view engine', 'njk');

app.get('/mvp', async (req, res) => {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
        .then(function (response) {
        // handle success
            console.log(response.data.date);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
    res.render('mvp')
});

app.listen(port, function() {
    console.log('Express started')
 });

 