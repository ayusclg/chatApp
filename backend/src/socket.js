import express from "express";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("authenticate", (data) => {
    const token = data.token;
    if (!token) {
      socket.emit("unauthorized", "Token required");
      socket.disconnect();
      return;
    }
    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      socket.user = user;
      socket.emit("authenticated", "Authentication successful");
    } catch (err) {
      socket.emit("unauthorized", "Invalid token");
      socket.disconnect();
    }
  });

  socket.on("disconnect", () => {
    console.log("socket connection disconnected", socket.id);
  });
});

export { app, httpServer, io };
