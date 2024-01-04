const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const URL=app.settings.env==="development" ? "http://localhost:3000/" :"https://draw-together-psi.vercel.app/"

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: URL
});

io.on("connection", (socket) => {
  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("anything_path", arg);
  });
  socket.on("drawPath", (arg) => {
    socket.broadcast.emit("anything_draw", arg);
  });
  socket.on("changeconfig", (arg) => {
    socket.broadcast.emit("any_changeconfig", arg);
  });
  console.log("server connected");
});

httpServer.listen(4000);
