import { IdType } from '../shared/shared-types';
import SingleItem from '../components/SingleItem/SingleItem';
export interface Item {
  id: IdType;
  itemName: string;
  description: string;
  price: number;
  size: string;
  imageUrl: string;
  itemsInStock?: number | [];
  rating?: number;
  numReviews?: number;
}
export interface SingleItemType {
  _id: IdType;
  itemName: string;
  description: string;
  price: number;
  size: string;
  imageUrl: string;
  itemsInStock?: number;
  rating?: number;
  numReviews?: number;
}
