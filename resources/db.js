var mongoose = require("mongoose");
var beautifyUnique = require("mongoose-beautiful-unique-validation");
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true });

var users = require('./db/users');

users.plugin(beautifyUnique);

var database = {
  "users": mongoose.model("users", users),
}

module.exports = database;
