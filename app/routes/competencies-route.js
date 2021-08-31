const express = require('express')
const router = express.Router()
const competenciesService = require('../services/competencies-service');

router.get("/", async (req, res) => {
    res.render('view-competencies-per-band', {bands: await competenciesService.getCompetencies()});
});


module.exports = router