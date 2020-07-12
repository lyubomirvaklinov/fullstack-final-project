import { IdType } from '../shared/shared-types';
import SingleItem from '../components/SingleItem/SingleItem';
export interface Item {
  id: IdType;
  itemName: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  size: string[];
  itemsInStock: number | [];
  numReviews?: number;
}
export interface SingleItemType {
  _id: IdType;
  itemName: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  size: string[];
  itemsInStock: number;
  numReviews?: number;
}
