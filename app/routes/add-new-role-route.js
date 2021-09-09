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
    if (locations && typeof(req) != "undefined") {
        for (let i = 0; i < locations.length; i++ ){
            if (eval('req.body.location' + (i+1))) {
                selectedLocations.push(eval('req.body.location' + (i+1)))
            }
        }
    }
    
    var newRole = addNewRoleService.packNewRole(req,selectedLocations);

    if (addNewRoleService.validateInput(newRole)[0]) {
        let status = await addNewRoleService.addNewRole(newRole);
        res.render('add-new-role', {bands: await addNewRoleService.getAllBands(), locations: locations, data: req.body, status: status});
    } else {
        res.locals.errormessage = addNewRoleService.validateInput(newRole)[1];
        res.render('add-new-role', {bands: await addNewRoleService.getAllBands(), locations: locations, data: req.body});
    }
    
    console.log(newRole)
});

module.exports = router