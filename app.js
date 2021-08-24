const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const axios = require('axios');

let port = 7999;

nunjucks.configure('app/views', {
    express: app
});

app.use(express.static('app'));

app.set('view engine', 'njk');

app.get('/mvp', async (req, res) => {
    axios.get('http://localhost:8080/job-roles')
        .then(function (response) {
        // handle success
        res.render('mvp', { job_roles: response.data} ) 
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
});

app.listen(port, function() {
    console.log('Express started')
 });

 