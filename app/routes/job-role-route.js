const express = require('express')
const router = express.Router()
const jobRoleService = require('../services/job-role-service');

router.get("/", async (req, res) => {
    //res.render('view-job-roles', {job_roles: await jobRoleService.getJobRoles()});
    res.render('view-job-roles', {job_roles: [
        {
          id: 1,
          title: 'Head of test job',
          locations: [{name:"London"},{name:"Belfast"}, {name:"Birmingham"}],
          contractType: 'part_time',
          posted: '2021-09-02 06:03:04'
        },
        {
          id: 2,
          title: 'Head of People Operations',
          locations: [{name:"Belfast"}],
          contractType: 'full_time',
          posted: '2021-09-02 06:03:04'
        },
        {
          id: 3,
          title: 'Technical Architect',
          locations: [{name:"Belfast"}],
          contractType: 'full_time',
          posted: '2021-09-02 06:03:04'
        },
        {
          id: 4,
          title: 'Security Engineer',
          locations: [{name:"London"},{name:"Belfast"}],
          contractType: 'full_time',
          posted: '2021-09-02 06:03:04'
        },
        {
          id: 5,
          title: 'Product Manager',
          locations: [{name:"Derry"}],
          contractType: 'full_time',
          posted: '2021-09-02 06:03:04'
        },
        {
          id: 6,
          title: 'Senior Software Engineer',
          locations: [{name:"Toronto"},{name:"Belfast"}],
          contractType: 'full_time',
          posted: '2021-09-02 06:03:04'
        },
        {
          id: 7,
          title: 'Test Engineer',
          locations: [{name:"Gdansk"},{name:"Birmingham"}],
          contractType: 'full_time',
          posted: '2021-09-02 06:03:04'
        }
    ]});
});


module.exports = router