const express = require('express')
const router = express.Router()
const jobRoleService = require('../services/job-role-service');

router.get("/", async (req, res) => {
    res.render('view-job-roles', {job_roles: await jobRoleService.getJobRoles()});
});

router.delete("remove-role/:jobRoleID", async (req, res) => {
    res.render('view-job-roles', {  job_roles: await jobRoleService.getJobRoles(), 
                                    delete_job_role: await jobRoleService.deleteJobRole(req.params.jobRoleID)});
})

module.exports = router