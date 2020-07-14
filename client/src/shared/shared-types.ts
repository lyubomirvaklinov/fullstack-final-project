import { SingleItemType } from '../model/items-model';
import { AddToCartReducerState } from '../model/cartTypes';
import { UserListActions, RegisterAndUpdateActions, LoggingActions, UserActions } from '../model/userType';
import { OrderDetails, OrderCreate } from '../model/orderTypes';
import { ItemSaveState } from '../model/itemTypes';

export type IdType = string;

// Redux state
export interface ReduxState {
  itemList: {
    loading: boolean;
    result: SingleItemType[];
    error?: string;
  };
  itemDetails: {
    loading: boolean;
    result: SingleItemType;
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
  singleOrderDetails: any;
  deleteOrders: OrderCreate;
  orderDetails: OrderDetails;
  cancelOrder: OrderCreate;
  userLogging: LoggingActions;
  userRegister: RegisterAndUpdateActions;
  userUpdate: UserActions;
  userList: UserListActions;
  userDelete: any;
}

export type getStateType = () => ReduxState;
