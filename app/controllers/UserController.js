var lang = require('../lang');
var models = require('../models');
var helpers = require('../helpers');
import User from "../models/user";

var methods = {
  /**
   * Sample Request to Welcome New User
   * @group Users
   * @route GET /
   */
  UserWelcome: function (req, res) {
    try {
      res.json({
        status: res.statusCode,
        message: lang.user.message.success.userwelcome
      });
    } catch (err) {
      res.json({
        status: err.status,
        message: err.message
      });
    }
  },
  /** 
   * Sample Request to Issue JWT token for Users API
   * @group Users
   * @route POST /user/issuejwt
   * @param {string} username.query.required - username for user
   * @param {string} email.query.required - email address of the user
   * @param {string} role.query.required - authorization role of the user
   */
  IssueJWT: function (req, res) {
    try {
      var issueToken = helpers.jwt.issueJWT({
        user: req.body.username,
        email: req.body.email,
        role: req.body.role
      });

      res.json({
        status: req.statusCode,
        message: lang.user.message.success.issuejwt,
        data: {
          token: issueToken
        }
      });
    } catch (err) {
      res.json({
        status: err.status,
        message: err.message
      });
    }
  },
  /** 
   * Sample Request for Verification of the JWT Token
   * @group Users
   * @route POST /user/verifyjwt/{email}
   * @param {string} email.query.required - email address of the user
   * @param {string} password.query.required - password of the user
   * @security JWT
   */
  VerifyJWT: function (req, res) {
    try {
      if (req.headers.authorization && helpers.jwt.verifyJWT(req.headers.authorization)) {
        res.json({
          status: res.statusCode,
          message: lang.user.message.success.verifyjwt
        });
      } else {
        throw ({
          status: 400,
          message: lang.user.message.error.verifyjwt
        });
      }
    } catch (err) {
      res.json({
        status: err.status,
        message: err.message
      });
    }
  },

 getUser:(req,res)=>{
  console.log(req,res,"req res");
 }
}

module.exports = methods;