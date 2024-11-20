import http from "http";

import express from "express";
import path from "path";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("A new user has connected", socket.id);
});

app.use(epress.static(path.resolve("./Frontend")));

//app.get("/", (req, res) => {

// })

server.listen(process.env.PORT || 3000 , () => {
    console.log(`Server is listening on port:${process.env.PORT}`);
})