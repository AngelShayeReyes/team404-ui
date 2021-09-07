const express = require('express')
const router = express.Router()
const jobRoleService = require('../services/job-role-service');

router.get("/", async (req, res) => {
    res.render('view-job-roles', {job_roles: await jobRoleService.getJobRoles()});
});

router.delete("/removerole/:jobId", async (req, res) => {
    res.render('view-job-roles', {delete_job_role: await jobRoleService.deleteJobRole(req.params.jobId)});
})

module.exports = router