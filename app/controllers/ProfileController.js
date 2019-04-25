import * as helpers from "../helpers";
import User from "../models/user";

import path from "path";
import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/profileImages/");
  },
  filename: (req, file, cb) => {
    helpers.verifyJWT(req.headers.authorization).then(tokenData => {
      let { email } = tokenData;
      User.findOne({ email }, { password: 0 })
        .then(result => {
          if (!result) {
            cb("User Not Found");
          } else {
            let imageUrl =
              "IMAGE-" +
              result._id +
              "-" +
              Date.now() +
              path.extname(file.originalname);
            User.findOneAndUpdate(
              { email },
              { $set: { profileImage: imageUrl } },
              { new: true }
            )
              .then(result => {
                console.log("result", result);
                cb(null, imageUrl);
              })
              .catch(error => {
                cb(error);
              });
          }
        })
        .catch(error => {
          cb(error);
        });
    });
  }
});

export const upload = multer({ storage: storage });

export const updateUserImage = (req, res) => {
  helpers
    .verifyJWT(req.headers.authorization)
    .then(tokenData => {
      User.findOne({ email: tokenData.email }, { password: 0 }).then(result => {
        if (result) {
          res.json({
            success: false,
            message: "Profile Image Updated Successfully",
            data: result
          });
        } else {
          res.json({
            success: false,
            message: "error in fetch data"
          });
        }
      });
    })
    .catch(error => {
      res.json({
        success: false,
        error
      });
    });
};
