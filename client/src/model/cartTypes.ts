import { IdType } from '../shared/shared-types';

export interface CartPayload {
  id: IdType;
  itemName: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  size: string[];
  itemsInStock: number;
  qty: number;
}

export interface AddToCartReducerState {
  cartItems: CartPayload[];
}
