const express = require('express')
const router = express.Router()
const matrixRolesService = require('../services/matrix-roles-service');

router.get("/", async (req, res) => {
    res.render('view-matrix-roles', {matrix: await matrixRolesService.getMatrix()});
});

module.exports = router
