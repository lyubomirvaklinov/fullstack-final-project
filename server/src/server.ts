import * as express from 'express';
import mockData from './mock-items';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import config from './config';
import userRoute from './routes/userRoute';
import itemRoute from './routes/itemRoute';
import orderRoute from './routes/orderRoute';
import * as mongoose from 'mongoose';

dotenv.config();
const mongodbURL = config.MONGODB_URL;

mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch((e) => console.log(e));

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/users', userRoute); 
app.use('/api/items', itemRoute); 
app.use('/api/orders', orderRoute);

// app.get('/api/items', (req, res) => {
//   res.json(mockData.items);
// });

// app.get('/api/items/:id', (req, res) => {
//   const itemId = req.params.id;
//   const item = mockData.items.find((x) => x.id === itemId);
//   if (item) {
//     res.json(item);
//   } else {
//     res.status(404).json({ error: 'Product not found!' });
//   }
// });

app.listen(9000, () => {
  console.log('Server started at http://localhost:9000');
});
