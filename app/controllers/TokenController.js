var lang = require("../lang");
var helpers = require("../helpers");
import User from "../models/user";

export const validateUserToken = (req, res, next) => {
  let token = req.headers.authorization;
  helpers
    .verifyJWT(token)
    .then(tokenData => {
      next();
    })
    .catch(error =>
      res.json({
        success: false,
        error
      })
    );
  // User.findOne({ token }).then(result => {
  //   if (!result) {
  //     res.json({
  //       sucess: false,
  //       message: "Token Expired"
  //     });
  //   } else {
  //     next();
  //   }
  // });
};
