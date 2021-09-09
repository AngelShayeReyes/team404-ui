const express = require('express');
const { LogManager } = require('selenium-webdriver/lib/logging');
const router = express.Router()
const addNewRoleService = require('../services/add-new-role-service');

router.get("/", async (req, res) => {
    res.render('add-new-role', {bands: await addNewRoleService.getAllBands(), locations: await addNewRoleService.getAllLocations()});
});

router.post("/", async (req, res) => {
    locations = await addNewRoleService.getAllLocations();
    
    selectedLocations = getLocations(locations);
    
    var newRole = packNewRole(req,selectedLocations);

    if (validateInput(newRole)[0]) {
        let status = await addNewRoleService.addNewRole(newRole);
        res.render('add-new-role', {bands: await addNewRoleService.getAllBands(), locations: locations, data: req.body, status: status});
    } else {
        res.locals.errormessage = validateInput(newRole)[1];
        res.render('add-new-role', {bands: await addNewRoleService.getAllBands(), locations: locations, data: req.body});
    }
    
    console.log(newRole)
});

function getLocations(locations) {
    selectedLocations = [];
    if (locations) {
        for (let i = 0; i < locations.length; i++ ){
            if (eval('req.body.location' + (i+1))) {
                selectedLocations.push(eval('req.body.location' + (i+1)))
            }
        }
    }
    return selectedLocations;
}

function packNewRole(req, selectedLocations) {
    return {
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
}

function validateInput(newRole) {
    if (!(newRole.title && newRole.description && newRole.contractType && newRole.locations.length > 0 
        && newRole.capability && newRole.responsibilities && newRole.band && newRole.jobFamily && newRole.sharePointLink)) {

            return [false, "Empty fields!"]
    } else if (newRole.title.length > 200) {
        return [false, "Title too long! Max 200 characters!"]
    } else if (newRole.responsibilities.length > 200) {
        return [false, "Responsibilities too long! Max 400 characters!"]
    } else if (newRole.sharepointLink.length > 200) {
        return [false, "Sharepoint Link too long! Max 200 characters!"]
    } else {
        return [true, "No error!"]
    }
}

module.exports = router