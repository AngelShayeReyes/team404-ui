const express = require('express')
const router = express.Router()
const jobRoleService = require('../services/job-role-service');

router.get("/", async (req, res) => {
    res.render('view-job-roles', {job_roles: await jobRoleService.getJobRoles()});
});

module.exports = router