const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkingauth');
const dashcontroller = require('../controller/dashcontroller');


router.get('/dashboard', isLoggedIn ,dashcontroller.dashboard);


module.exports = router;