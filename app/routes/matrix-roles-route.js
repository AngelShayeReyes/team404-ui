const express = require('express')
const router = express.Router()

router.get("/", async (req, res) => {
    res.render('view-matrix-roles');
});

module.exports = router
