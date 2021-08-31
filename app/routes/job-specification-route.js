const express = require('express')
const router = express.Router()
const jobSpecService = require('../services/job-specification-serivce');

router.get("/:jobId", async (req, res) => {
    res.render('viewjobspecification', {job_spec: await jobSpecService.getJobSpec(req.params.jobId)});
});

module.exports = router