import { Item, SingleItemType } from '../model/items-model';
import { AddToCartReducerState } from './cartTypes';
import { LogInUserType, UserListActions } from './userType';
import { OrderDetails, Order, OrderCreate } from './orderTypes';
import { Dispatch } from 'redux';
import { SetStateAction } from 'react';

export type IdType = string;

export interface ItemAppState {
  loading: boolean;
  result: SingleItemType[];
  error?: string;
}

export interface ItemListener {
  (item: SingleItemType): void;
}

export interface Filter {
  category: string;
  price: string;
}

export interface ItemListProps {
  items: SingleItemType[];
  loading: boolean | undefined;
  error: string | undefined;
  filter: Filter;
  setFilter: any;
  filterState: boolean;
  setFilterState: any;
}

export interface ItemListActions {
  loading: boolean;
  result: SingleItemType[];
  error?: string;
}
export interface ItemDetailsState {
  loading: boolean;
  result: SingleItemType;
  error?: string;
}

export interface ItemDetailsActions {
  loading: boolean;
  result: SingleItemType;
  error?: string;
}

export interface ItemDeleteActions {
  loading: boolean;
  result: SingleItemType;
  error?: string;
  success?: boolean;
}
export interface ItemSaveState {
  loading: boolean;
  success?: boolean;
  result?: SingleItemType;
  error?: string;
}
export interface SaveItemRequest {
  itemName: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  size: string[];
  itemsInStock?: number;
  numReviews?: number;
}

export interface ItemActions {
  loading: boolean;
  userInfo?: LogInUserType;
  error?: string;
}
//  UserActions


export interface UserActions {
  loading: boolean;
  userInfo?: LogInUserType;
  success?: boolean;
  error?: string;
}

export interface LoggingActions {
  isLoggedIn: boolean;
  userInfo?: LogInUserType;
  error?: string;
}
export interface LogOutActions {
  isLoggedOut: boolean;
  userInfo?: LogInUserType;
  error?: string;
}

//  Order

// Redux state
export interface ReduxState {
  itemList: {
    loading: boolean;
    result: SingleItemType[];
    error?: string;
  };
  itemDetails: {
    loading: boolean;
    result: Item;
    error?: string;
  };
  itemSave: ItemSaveState;
  itemUpdate: ItemSaveState;
  itemDelete: ItemSaveState;
  cart: AddToCartReducerState;
  createOrder: OrderCreate;
  updateOrder: OrderCreate,
  listOrders: OrderCreate;
  listMyOrders: OrderCreate;
  deleteOrders: OrderCreate;
  orderDetails: OrderDetails;
  cancelOrder: OrderCreate;
  userLogging: LoggingActions;
  userRegister: UserActions;
  userUpdate: UserActions;
  userList: UserListActions;
  userDelete: any;
}

export type getStateType = () => ReduxState;
