var lang = require("../lang");
var helpers = require("../helpers");
import User from "../models/user";

export const registerUser = (req, res) => {
  console.log("ressss===>", req.body);
  let { email, username } = req.body;
  User.findOne({ email })
    .then(result => {
      if (!result) {
        User.findOne({ username }).then(result => {
          if (!result) {
            try {
              console.log("issue Tokens stat");
              var issueToken = helpers.issueJWT({
                email: req.body.email,
                role: req.body.role || "user"
              });

              let verificationCode = helpers.mixedString(10);
              let verifyToken = helpers.issueJWT({
                email: req.body.email,
                verificationCode
              });
              let verificationLink = `<b>Please follow following link to activate your account.</b> <a href="${
                process.env.BASE_URL
              }:${
                process.env.PORT
              }/users/verifyAccount/${verifyToken}">Click Here to verify</a>`;
              helpers.sendMail({
                from: '"Api Test " <tristin97@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "Verification Email Test Server 👻", // Subject line
                html: verificationLink
              });
              req.body.token = issueToken;
              req.body.verificationToken = verifyToken;
              const newUser = new User({
                ...req.body
              });
              newUser
                .save()
                .then(doc => {
                  let data = { ...doc._doc };
                  data.token = issueToken;
                  res.json({
                    success: true,
                    message: "user created successfully!",
                    data: doc._doc
                  });
                })
                .catch(error => {
                  console.log("error in save", error);
                  res.json({ success: false, ...error });
                });
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
    })
    .catch(e => {
      console.log(e);
      res.json({
        success: false,
        message: e
      });
    });
};

export const signin = (req, res) => {
  let { email, password } = req.body;
  try {
    console.log("issue Tokens stat");
    var issueToken = helpers.issueJWT({
      user: req.body.username,
      email: req.body.email,
      role: req.body.role || "user"
    });
    console.log("issueTokens", issueToken);
    User.findOneAndUpdate(
      { email, password },
      { $set: { token: issueToken } }
    ).then(result => {
      if (!result) {
        res.json({
          success: false,
          message: "Invalid username/password"
        });
      } else {
        if (result.active) {
          res.json({
            success: true,
            data: result,
            message: "user successfully logged in"
          });
        } else if (result.disabled) {
          res.json({
            success: false,
            message: "User is blocked please connect with admin!"
          });
        } else if (result.deleted) {
          res.json({
            success: false,
            message: "User not found!"
          });
        } else {
          res.json({
            success: false,
            message: "User email not verified!"
          });
        }
      }
    });
  } catch (err) {
    res.json({
      status: err.status,
      message: "Not able to generate user token, please try again"
    });
  }
};

export const verifyAccount = (req, res) => {
  let { token } = req.params;
  let verifyToken = helpers.verifyJWT(token);
  let { email } = verifyToken;
  User.findOneAndUpdate(
    { email },
    { $set: { active: true, verificationToken: "" } }
  ).then(result => {
    if (!result) {
      res.json({
        message: "Account Verification fail."
      });
    } else {
      res.json({
        message: "Account Verified Successfully please login."
      });
    }
  });
};
