var mongoose = require("mongoose");
var beautifyUnique = require("mongoose-beautiful-unique-validation");
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true
});

// Include Schemas
var users = require('./db/users')

// Integrate Beautify Unique Plugin to required collections
users.plugin(beautifyUnique);

// Export Collections
module.exports = {
  "users": mongoose.model("users", users),
};
