const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const axios = require('axios');
const dateFilter = require('nunjucks-date-filter');

let port = 7999;

/* 
    Configure view engine
*/
let env = nunjucks.configure('app/views', {
    express: app
});
env.addFilter('date', dateFilter);
app.use(express.static('app'));

app.set('view engine', 'njk');

/*
    Routing
*/
const routes = require('./app/routes.js')
app.use('/', routes)

app.get('*', (req, res) => {
    res.render('not-found'); 
});

app.get('/viewjobspecification/:jobId', async (req, res) => {
    axios.get('http://localhost:8080/job-roles/' + req.params.jobId)
    .then(function (response) {
        // handle success
        res.render('viewjobspecification', { job_name: response.data.title, contract_type: response.data.contractType, job_description: response.data.description, job_locations: response.data.locations}) 
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
});

/* 
    Port configuration 
*/
app.listen(port, function() {
    console.log('Express started')
 });

 /* 
    Handle interrupt to close the application 
*/
process.on('SIGINT', function () {
    console.log("Application shutting down...");
    process.exit();
});