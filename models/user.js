const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.01:27017/testapp1`);

const userSchema = mongoose.Schema({
  name: String,
  image: String,
  email: String,
});

module.exports = mongoose.model("user", userSchema);
