const express = require('express')
const router = express.Router()
const competenciesService = require('../services/add-new-role-service');

router.get("/", async (req, res) => {
    res.render('add-new-role', {bands: await competenciesService.getAllBands()});
});

router.post("/", async (req, res) => {
    res.locals.errormessage = "Not implemented yet!";
    res.render('add-new-role', req.body);
});

module.exports = router