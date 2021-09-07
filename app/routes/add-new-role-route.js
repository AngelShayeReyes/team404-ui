const express = require('express');
const { LogManager } = require('selenium-webdriver/lib/logging');
const router = express.Router()
const addNewRoleService = require('../services/add-new-role-service');

router.get("/", async (req, res) => {
    res.render('add-new-role', {bands: await addNewRoleService.getAllBands()});
});

router.post("/", async (req, res) => {
    //res.locals.errormessage = "Not implemented yet!";
    let status = await addNewRoleService.addNewRole(req.body);
    res.render('add-new-role', {bands: await addNewRoleService.getAllBands(), data: req.body, status: status});
});

module.exports = router