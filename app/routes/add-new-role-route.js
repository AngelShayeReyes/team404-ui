const express = require('express');
const { LogManager } = require('selenium-webdriver/lib/logging');
const router = express.Router()
const addNewRoleService = require('../services/add-new-role-service');

router.get("/", async (req, res) => {
    res.render('add-new-role', {bands: await addNewRoleService.getAllBands(), locations: await addNewRoleService.getAllLocations()});
});

router.post("/", async (req, res) => {
    locations = await addNewRoleService.getAllLocations();
    
    selectedLocations = [];
    for (let i = 0; i < locations.length; i++ ){
        if (eval('req.body.location' + (i+1))) {
            selectedLocations.push(eval('req.body.location' + (i+1)))
        }
    }
    
    var newRole = {
        title: req.body.title,
        description: req.body.description,
        contractType: req.body.contractType,
        locations: selectedLocations,
        capability: req.body.capability,
        responsibilities: req.body.responsibilities,
        band: req.body.band,
        jobFamily: req.body.jobFamily,
        sharepointLink: req.body.sharepointLink
    }

    let status = await addNewRoleService.addNewRole(newRole);
    res.render('add-new-role', {bands: await addNewRoleService.getAllBands(), locations: locations, data: req.body, status: status});
    
    console.log(newRole)
});

module.exports = router