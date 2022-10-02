const express  = require('express');
const router = express.Router();

console.log("router");

const indexController = require('../controller/index_controller');

router.get('/', indexController.index);

module.exports = router;