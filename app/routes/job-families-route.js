const express = require('express')
const router = express.Router()

router.get("/", async (req, res) => {
    res.render('view-job-family-per-capability');
});

module.exports = router
