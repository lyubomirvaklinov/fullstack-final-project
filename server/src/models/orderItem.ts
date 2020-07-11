import * as mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  qty: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  price: { type: String, required: true },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: false
  },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  orderItems: [orderItemSchema],
  itemsPrice: { type: Number },
  totalPrice: { type: Number },
  isCancelled: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
}, {
  timestamps: true
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
