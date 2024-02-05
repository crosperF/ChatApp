const express = require("express");
const app = express();

const http = require("http");
// const { sourceMapsEnabled } = require("process");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("connection made");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("chat message", (data) => {
        io.emit("message update", data);
    });
});

server.listen(3000, () => {
    console.log("listening on port: 3000");
});
