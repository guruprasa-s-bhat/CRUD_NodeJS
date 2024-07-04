const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.01:27017/mongopractice`);

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
});

module.exports = mongoose.model("user", userSchema);
