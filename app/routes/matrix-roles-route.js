const express = require('express')
const router = express.Router()

router.get("/", async (req, res) => {
    res.render('view-matrix-roles', {bands: await matrixRolesService.getBands(), job_families: await matrixRolesService.getJobFamilies()});
});

module.exports = router
