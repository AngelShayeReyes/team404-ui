const express = require('express')
const router = express.Router()
const jobFamiliesService = require('../services/job-families-service');

router.get("/", async (req, res) => {
    res.render('view-job-family-per-capability', {jobFamilies: await jobFamiliesService.getJobFamilies()});
});

module.exports = router