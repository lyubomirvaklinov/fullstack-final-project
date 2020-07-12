import * as express from 'express';
import Item from '../models/itemModel';
import { ItemType } from '../types/Item';
import { auth, isAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await Item.find({});
  res.json(items);
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });
    if (item) res.json(item);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

router.delete('/:id', auth, isAdmin, async (req, res) => {
  const itemId = req.params.id;
  const itemToDelete = await Item.findById(itemId);
  if (itemToDelete) {
    await itemToDelete.remove();
    res.json({ message: 'Item deleted!' });
  } else {
    res.json('Error while trying to delete item.');
  }
});

router.post('/manage-items', auth, isAdmin, async (req, res) => {
  const reqData = req.body as ItemType;
  const item = new Item({
    itemName: reqData.itemName,
    description: reqData.description,
    price: reqData.price,
    size: reqData.size,
    imageUrl: reqData.imageUrl,
    itemsInStock: reqData.itemsInStock,
    category: reqData.category,
    numReviews: reqData.numReviews,
  });
  const newItem = await item.save();
  if (newItem)
    return res
      .status(201)
      .json({ message: 'Item added successfully!', data: newItem });
  return res.status(500).json({ error: 'Error while creating item!' });
});
router.put('/edit-item/:id', auth, isAdmin, async (req, res) => {
  const itemId = req.params.id;
  const itemToUpdate: any = await Item.findOne({ _id: itemId });
  const reqData = req.body as ItemType;
  if (itemToUpdate) {
    itemToUpdate.itemName = reqData.itemName;
    itemToUpdate.description = reqData.description;
    itemToUpdate.price = reqData.price;
    itemToUpdate.size = reqData.size;
    itemToUpdate.imageUrl = reqData.imageUrl;
    itemToUpdate.itemsInStock = reqData.itemsInStock;
    itemToUpdate.category = reqData.category;

    const updatedItem = await itemToUpdate.save();

    if (updatedItem) {
      return res
        .status(200)
        .json({ message: 'Item Updated', data: updatedItem });
    }
  }

  return res.status(500).json({ error: 'Error while updating the item!' });
});

export default router;
