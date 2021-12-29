const User = require("../model/User");
const Comment = require("../model/Comment");
const Room = require("../model/Room");
const moment = require("moment");

class ChatController {
  static async chatEnter(req, res) {
    try {
      const { username, roomname } = req.body;

      if (!username || !roomname) {
        return res.status(400).json({
          message: "Missing username or roomname",
        });
      }

      let chosenRoom = await Room.findOne({
        roomname: roomname,
      });

      let chosenUser = await User.findOne({
        username: username,
      });

      if (!chosenRoom) {
        let newRoom = new Room({
          roomname: roomname,
          listUser: [],
          createdAt: moment(),
        });

        await newRoom.save();
        chosenRoom = newRoom;
      }

      if (!chosenUser) {
        let newUser = new User({
          username: username,
          createdAt: moment(),
        });

        await newUser.save();
        chosenUser = newUser;
      }

      if (chosenRoom.listUser.indexOf(chosenUser.id) >= 0) {
        return res.status(400).json({
          message:
            "there already user with the same name inside this room, please choose other name",
        });
      } else {
        await chosenRoom.listUser.push(chosenUser.id);
        await chosenRoom.save();
      }

      return res.status(200).json({
        message: `Entering room`,
        result: {
          userId: chosenUser.id,
          roomId: chosenRoom.id,
        },
      });
    } catch (error) {
      console.log(error, "error");
      return res.status(500).json({
        message: "Error",
        error: error,
      });
    }
  }

  static async chatGetAll(req, res) {
    try {
      const { roomname } = req.params;

      if (!roomname) {
        return res.status(400).json({
          message: "Missing roomname",
        });
      }

      let chosenRoom = await Room.findOne({
        roomname,
      });
      
      if (!chosenRoom) {
        return res.status(404).json({
          message: "room not found",
        });
      }

      let chatCollection = await Comment.find({
        roomId: chosenRoom.roomname,
      });

      return res.status(200).json({
        message: `Room chat data retireved`,
        result: chatCollection,
      });
    } catch (error) {
      console.log(error, "error");
      return res.status(500).json({
        message: "Error",
        error: error,
      });
    }
  }

  static async chatPost(req, res) {
    try {
      const { content, userId, roomId } = req.body;

      if (!content) {
        return res.status(400).json({
          message: "Missing comment",
        });
      }

      if (!userId || !roomId) {
        return res.status(400).json({
          message: "Missing userId or roomId",
        });
      }

      let chosenUser = await User.findById(userId);

      if (!chosenUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      let newComment = new Comment({
        content,
        roomId,
        userId,
        username: chosenUser.username,
        createdAt: moment(),
      });

      await newComment.save();

      req.app.io.emit(roomId, {
        content,
        createdAt: moment(newComment.createdAt).format("DD MMMM YYYY HH:mm:ss"),
        roomId,
        userId,
        username: chosenUser.username,
      });

      return res.status(201).json({
        message: `A new comment created`,
      });
    } catch (error) {
      console.log(error, "error");
      return res.status(500).json({
        message: "Error",
        error: error,
      });
    }
  }
}

module.exports = ChatController;
