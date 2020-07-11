import * as mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true, default: 0 },
  size: { type: String, required: true, default: false },
  imageUrl: { type: String, required: true, default: false },
  itemsInStock: { type: String, required: true, default: 0  },
  rating: { type: String, required: true, default: 0 },
  numReviews: { type: String, required: true, default: 0 },
});

const itemModel = mongoose.model('Item', itemSchema);

export default itemModel;
