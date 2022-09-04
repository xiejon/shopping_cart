import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import data from "./data.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
