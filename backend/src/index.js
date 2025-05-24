import { httpServer, app } from "./socket.js";
import MongoStore from "rate-limit-mongo";
import rateLimit from "express-rate-limit";
import express from "express";
import cors from "cors";
import { dbConnect } from "./database/index.js";
import userRoutes from "./routes/user.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const port = 3000;
const host = "127.0.0.1";

//rate-limit

const limit = rateLimit({
  windowMs: 1 * 60 * 1000, //5min
  max: 10, //number of max request
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => {
    return req.user?._id || req.ip;
  },
  store: new MongoStore({
    uri: "mongodb://127.0.0.1:27017/messenger",
    expireTimeMs: 15 * 60 * 1000,
    collectionName: "rateLimitRecords",
  }),
});

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
//app.use(limit);
app.use(express.json());
app.use(express.urlencoded());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("this is hi from backend");
});

app.use("/auth", userRoutes);
dbConnect()
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`server running on http://${host}:${port}`);
    });
  })
  .catch(() => {
    console.log("database connection error in main server", Error);
  });
