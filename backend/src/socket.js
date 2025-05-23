import express from "express"
import http from 'http'
import { Server } from 'socket.io'


const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});



io.on("connection", (socket) => {
    console.log("socket connected successfully",socket.id)
})




io.on("disconnect", (socket) => {
    console.log("socket connection disconnected",socket.id)
})

export{app,httpServer,io}