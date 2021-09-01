const express = require('express')
const router = express.Router()
const matrixRolesService = require('../services/matrix-roles-service');

router.get("/", async (req, res) => {
    res.render('view-matrix-roles', {matrix_roles: await matrixRolesService.getMatrixRoles()});
});

module.exports = router