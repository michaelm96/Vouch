const mongoose = require("mongoose");

let commentSchema = mongoose.Schema({
  content: {
    type: String,
    default: "",
  },
  roomId: {
    type: String,
    default: "",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Comment", commentSchema);
