var lang = require("../lang");
var models = require("../models");
var helpers = require("../helpers");
import User from "../models/user";

 /**
   * Sample Request to Issue JWT token for Users API
   * @group Users
   * @route POST /user/issuejwt
   * @param {string} username.query.required - username for user
   * @param {string} email.query.required - email address of the user
   * @param {string} role.query.required - authorization role of the user
   */
  export const IssueJWT= (req, res)=> {
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
  }


  /**
   * Sample Request for Verification of the JWT Token
   * @group Users
   * @route POST /user/verifyjwt/{email}
   * @param {string} email.query.required - email address of the user
   * @param {string} password.query.required - password of the user
   * @security JWT
   */
  export const VerifyJWT=(req, res) =>{
    try {
      if (
        req.headers.authorization &&
        helpers.jwt.verifyJWT(req.headers.authorization)
      ) {
        res.json({
          status: res.statusCode,
          message: lang.user.message.success.verifyjwt
        });
      } else {
        throw {
          status: 400,
          message: lang.user.message.error.verifyjwt
        };
      }
    } catch (err) {
      res.json({
        status: err.status,
        message: err.message
      });
    }
  }

  /**
   * Api for create new user
   * @group Users
   * @route POST /user/registerUser
   * @param {user.model} user.body.required
   * @param {string} username.required - username for user
   * @param {string} email.required - email address of the user
   * @param {string} firstname.required - firstname for user
   * @param {string} lastname.required - lastname for user
   * @param {string} password.required - password for user
   * @param {string} phone_number.required - phone number for user
   * @param {string} address - address for user
   * @param {string} city - city for user
   * @param {string} state - state for user
   * @param {string} country - country for user
   * @param {string} postal_code - postal_code for user
   * @param {string} role - authorization role of the user default "user"
   */
  export const registerUser=(req, res) => {
    let { email, username } = req.body;
    User.findOne({ email }).then(result => {
      if (!result) {
        User.findOne({ username }).then(result => {
          if (!result) {
            try {
              console.log("issue Tokens stat");
              var issueToken = helpers.jwt.issueJWT({
                user: req.body.username,
                email: req.body.email,
                role: req.body.role || "user"
              });
              console.log("issueTokens", issueToken);
              req.body.token = issueToken;
              const newUser = new User({
                ...req.body
              });
              newUser
                .save()
                .then(doc => {
                  res.json({
                    success: true,
                    message: "user created successfully!",
                    token: issueToken,
                    data: doc._doc
                  });
                })
                .catch(e => res.json({ success: false, ...e }));
            } catch (err) {
              res.json({
                status: err.status,
                message: "Not able to generate user token, please try again"
              });
            }
          } else {
            res.json({
              success: false,
              message:
                "user with username already registered, please use different email!"
            });
          }
        });
      } else {
        res.json({
          success: false,
          message:
            "user with email already registered, please use different email!"
        });
      }
    });
  }

