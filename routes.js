var express = require('express');
var router = express.Router();
var controllers = require('./app/controllers');

//     ____              __           
//    / __ \____  __  __/ /____  _____
//   / /_/ / __ \/ / / / __/ _ \/ ___/
//  / _, _/ /_/ / /_/ / /_/  __(__  ) 
// /_/ |_|\____/\__,_/\__/\___/____/  
                                   
router.get('/', controllers.UserController.UserWelcome);
router.post('/user/issuejwt', controllers.UserController.IssueJWT);
router.post('/user/verifyjwt', controllers.UserController.VerifyJWT);
router.get("/user/getUser/:userName",controllers.UserController.getUser);
module.exports = router;