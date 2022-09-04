import { Express } from "express";
import Product from "../models/productModel";
import data from "../data.js";

const seedRouter = Express.Router();

seedRouter.get("/", async(req, res) => {
  await Product.remove({}); // return all records inside product model
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});

export default seedRouter