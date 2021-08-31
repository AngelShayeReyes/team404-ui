const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
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