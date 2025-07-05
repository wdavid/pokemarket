const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado!");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

app.post("/notify-update", (req, res) => {
  io.emit("stockUpdated");
  res.send("Notificado!");
});

server.listen(4000, () => {
  console.log("Socket server corriendo en http://localhost:4000");
});
