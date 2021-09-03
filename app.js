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
const navigationRoute = require('./app/routes/navigation');
const jobRoleRoutes = require('./app/routes/job-role-route.js');
const jobSpecRoutes = require('./app/routes/job-specification-route.js');
const competenciesRoutes = require('./app/routes/competencies-route.js');
const matrixOfRolesRoutes = require('./app/routes/matrix-roles-route');

app.use("/navigation", navigationRoute);
app.use("/viewjobroles", jobRoleRoutes);
app.use("/viewjobspecification", jobSpecRoutes);
app.use("/viewcompetencies", competenciesRoutes);
app.use("/viewmatrixofroles", matrixOfRolesRoutes);

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