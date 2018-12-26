var lang = require('../lang');
var models = require('../models');
var helpers = require('../helpers');

var methods = {
  ShowLogin: function (req, res) {
    res.status(200).send({
      "title": "Node Project Generator"
    });
  }
}

module.exports = methods;