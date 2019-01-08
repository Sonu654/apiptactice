var lang = require('../lang');
var models = require('../models');
var helpers = require('../helpers');

var methods = {
  UserLogin: function (req, res) {
    try {
      res.send({
        status: res.statusCode,
        message: "User Logged in Successfully"
      });
    } catch (err) {
      res.send({
        status: err.status,
        message: err.message
      });
    }
  }
}

module.exports = methods;