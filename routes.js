var express = require('express');
var router = express.Router();
var controllers = require('./app/controllers');

router.get('/', controllers.UserController.ShowLogin);

module.exports = router;