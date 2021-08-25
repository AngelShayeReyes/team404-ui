const express = require('express')
const router = express.Router()
const axios = require('axios');

router.get('/', (req, res) => {
    res.render('navigation'); 
});

router.get('/mvp', async (req, res) => {
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

router.get('/viewjobroles', async (req, res) => {
    return axios.get('http://localhost:8080/job-roles')
        .then(function (response) {
        // handle success
        res.render('view-job-roles', { job_roles: response.data} ) 
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
});

module.exports = router