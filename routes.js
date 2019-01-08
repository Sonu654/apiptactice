var express = require('express');
var router = express.Router();
var controllers = require('./app/controllers');

router.get('/', controllers.UserController.UserLogin);

module.exports = router;