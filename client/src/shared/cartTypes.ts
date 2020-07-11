import { IdType } from './shared-types';

export interface CartPayload {
  id: IdType;
  itemName: string;
  description: string;
  price: number;
  size: string;
  imageUrl: string;
  itemsInStock: number;
  qty: number;
}

export interface AddToCartReducerState {
  cartItems: CartPayload[];
}
