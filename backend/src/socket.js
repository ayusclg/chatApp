import express from "express"
import http from 'http'
import { Server } from 'socket.io'


const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});



io.on("connection", (socket) => {
  console.log("socket connected successfully", socket.id);

 
  socket.emit("newMessage", "message me fast");

  socket.on("disconnect", () => {
    console.log("socket connection disconnected", socket.id);
  });
});


export{app,httpServer,io}