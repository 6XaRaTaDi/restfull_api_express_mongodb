import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import initAPIRoute  from '../api/routes/rootRouter.js'

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

console.log('env:.........', process.env.ACCESS_TOKEN_LIFE)

// init api router
initAPIRoute(app)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});