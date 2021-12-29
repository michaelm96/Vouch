require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server)
const cors = require("cors");
const port = process.env.PORT || 5000;
const routes = require("./routes");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    autoIndex: false,
  },
  function (err) {
    if (err) console.log(err);
    if (!err) console.log("Success connected");
  }
);
mongoose.set("debug", true);
app.io = io;

app.use(routes);

server.listen(5000, function() {
  console.log('listening on port 5000')
})