const mongoose = require("mongoose");

let roomSchema = mongoose.Schema({
  roomname: {
    type: String,
    default: "",
  },
  listUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Room", roomSchema);
