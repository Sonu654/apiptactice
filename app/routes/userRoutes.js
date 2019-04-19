import controllers from "../controllers";
//     ____              __
//    / __ \____  __  __/ /____  _____
//   / /_/ / __ \/ / / / __/ _ \/ ___/
//  / _, _/ /_/ / /_/ / /_/  __(__  )
// /_/ |_|\____/\__,_/\__/\___/____/

export default (app) => {
  console.log("hereeeee===>", app);
  app.post("/user/issuejwt", controllers.UserController.IssueJWT);
  app.post("/user/verifyjwt", controllers.UserController.VerifyJWT);
  app.post("/user/registerUser", controllers.UserController.registerUser);
};
