import * as express from 'express';
import Order from '../models/orderItem';
import { auth, isAdmin } from '../middleware/auth';
import * as mongoose from 'mongoose';
import { CheckOutOrderType } from '../types/orderTypes';

const router = express.Router();

router.get('/', auth, isAdmin, async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

router.post('/', auth, async (req: any, res) => {
  try {
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      user: req.user.id as mongoose.Schema.Types.ObjectId,
      totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    res
      .status(201)
      .json({ message: 'New Order Created', data: newOrderCreated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/approve/:id', auth, isAdmin, async (req, res) => {
  try {
    const order: any = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      const updatedOrder = await order.save();
      res.status(200).json({ message: 'Order Delivered.', data: updatedOrder });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.put('/cancel-request/:id', auth, async (req, res) => {
  try {
    const order: any = await Order.findById(req.params.id);
    if (order) {
      order.isCancelled = true;
      const updatedOrder = await order.save();
      res.status(200).json({ message: 'Order Cancelled.', data: updatedOrder });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.delete('/delete/:id', auth, isAdmin, async (req, res) => {
  try {
    const orderId = req.params.id;
    const itemToDelete = await Order.findById(orderId);
    if (itemToDelete) {
      await itemToDelete.remove();
      res.status(200).json({ message: 'Item deleted!', data: itemToDelete });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get('/my-orders', auth, async (req: any, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});

router.get('/order/:id', auth, async (req: any, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  res.json(order);
});

export default router;
