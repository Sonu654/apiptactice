import * as Controllers from "../controllers";
//     ____              __
//    / __ \____  __  __/ /____  _____
//   / /_/ / __ \/ / / / __/ _ \/ ___/
//  / _, _/ /_/ / /_/ / /_/  __(__  )
// /_/ |_|\____/\__,_/\__/\___/____/

export default app => {
  /**
   * Api for create new user
   * @group Users
   * @route POST /user/registerUser
   * @param {userRegister.model} user.body.required
   */
  app.post("/user/registerUser", Controllers.registerUser);
  /**
   * @typedef userRegister
   * @property {string} username.required - username for user
   * @property {string} email.required - email address of the user
   * @property {string} firstname.required - firstname for user
   * @property {string} lastname.required - lastname for user
   * @property {string} password.required - password for user
   * @property {string} phone_number.required - phone number for user
   * @property {string} address - address for user
   * @property {string} city - city for user
   * @property {string} state - state for user
   * @property {string} country - country for user
   * @property {string} postal_code - postal_code for user
   */

  /**
   * Api for login user
   * @group Users
   * @route POST /user/signin
   * @param {userLogin.model} user.body.require
   */
  app.post("/user/signin", Controllers.signin);
  /**
   * @typedef userLogin
   * @property {string} email.required - email address of the user
   * @property {string} password.required - password for user
   */

  app.get("/users/verifyAccount/:token", Controllers.verifyAccount);

  // app.post("/user/signin", Controllers.validateUserToken, Controllers.signin);
};
