import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsCost: req.body.itemsCost,
      shippingCost: req.body.shippingCost,
      taxCost: req.body.taxCost,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    const order = await newOrder.save()
    console.log(order)
    res.status(201).send({message: 'New Order Created', order})
  })
);

export default orderRouter