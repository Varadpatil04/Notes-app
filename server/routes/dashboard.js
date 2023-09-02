const express = require('express');
const router = express.Router();
const dashcontroller = require('../controller/dashcontroller');


router.get('/dashboard',dashcontroller.dashboard);


module.exports = router;