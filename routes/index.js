var express = require('express');
var router = express.Router();

var db = require('../resources/db')
var lang = require('../resources/lang')
var helper = require('../resources/helper')

router.get('/', async function(req, res, next) {
  res.status(200).json({
    "title": "Node Project Generator"
  });
});

module.exports = router;