import helpers from "../helpers";

export const updateUserImage = (req, res) => {
  let user = helpers.verifyJWT(req.headers.authorization);
  res.json({
    success: true
  });
};
