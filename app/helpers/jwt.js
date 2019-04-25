var jsonwebtoken = require("jsonwebtoken");

export const issueJWT = payload => {
  var options = {
    audience: process.env.JWT_AUDIENCE,
    expiresIn: process.env.JWT_EXPIRY
  };

  var jwtToken = jsonwebtoken.sign(payload, process.env.JWT_KEY, options);
  return jwtToken;
};

export const verifyJWT = token => {
  return new Promise((resolve, reject) => {
    try {
      var verify = jsonwebtoken.verify(token, process.env.JWT_KEY, {
        audience: process.env.JWT_AUDIENCE
      });
      resolve(verify);
    } catch (error) {
      reject({
        name: error.name,
        message: error.message,
        expiredAt: error.expiredAt
      });
    }
  });
};
