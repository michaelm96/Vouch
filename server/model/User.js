const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  username: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("User", userSchema);
