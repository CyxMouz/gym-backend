module.exports = (server) => {
  connected_user = 0;
  inGymUser = 0;
  var io = require("socket.io")(server, {
    cors: { origin: "http://localhost:8081" },
  });

  io.on("connection", async (socket) => {
    connected_user++;
    console.log("user connected : ", connected_user);
    await io.emit("connected_user", connected_user);
    //await socket.broadcast.emit("connected_user", { connected_user });
    await socket.on("onScan", (data) => {
      console.log("socket id : ", socket.id, " user : ", data);
    });

    await socket.on("disconnect", () => {
      connected_user--;
      io.emit("connected_user", connected_user);
      console.log("user connected : ", connected_user);
    });
  });
};
