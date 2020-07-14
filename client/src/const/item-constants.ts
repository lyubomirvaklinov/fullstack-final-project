import { SingleItemType } from '../model/items-model';
import { IdType } from '../shared/shared-types';
import { SaveItemRequest } from '../model/itemTypes';
import { UserActions } from '../model/userType';
import { CartPayload } from '../model/cartTypes';
import {
  LogInUserType,
  LogInUserRequest,
  RegisterUserRequest,
  RegisterAndUpdateActions,
} from '../model/userType';
import { OrderDetails, Order, CheckOutOrderType, OrderList } from '../model/orderTypes';
import { UserListType} from '../model/userType';

export const ITEM_LIST_REQUEST = 'ITEM_LIST_REQUEST';
export const ITEM_LIST_SUCCESS = 'ITEM_LIST_SUCCESS';
export const ITEM_LIST_FAILURE = 'ITEM_LIST_FAILURE';
export const ITEM_DETAILS_REQUEST = 'ITEM_DETAILS_REQUEST';
export const ITEM_DETAILS_SUCCESS = 'ITEM_DETAILS_SUCCESS';
export const ITEM_DETAILS_FAILURE = 'ITEM_DETAILS_FAILURE';
export const ITEM_SAVE_REQUEST = 'ITEM_SAVE_REQUEST';
export const ITEM_SAVE_SUCCESS = 'ITEM_SAVE_SUCCESS';
export const ITEM_SAVE_FAILURE = 'ITEM_SAVE_FAILURE';
export const ITEM_UPDATE_REQUEST = 'ITEM_UPDATE_REQUEST';
export const ITEM_UPDATE_SUCCESS = 'ITEM_UPDATE_SUCCESS';
export const ITEM_UPDATE_FAILURE = 'ITEM_UPDATE_FAILURE';
export const ITEM_DELETE_REQUEST = 'ITEM_DELETE_REQUEST';
export const ITEM_DELETE_SUCCESS = 'ITEM_DELETE_SUCCESS';
export const ITEM_DELETE_FAILURE = 'ITEM_DELETE_FAILURE';

export const USER_LIST_REQUEST = 'USER_LIST_REQUEST';
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS';
export const USER_LIST_FAILURE = 'USER_LIST_FAILURE';
export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST';
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';
export const USER_DELETE_FAILURE = 'USER_DELETE_FAILURE';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';
export const USER_REGISTER_CLEANUP = 'USER_REGISTER_CLEANUP';
export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS= 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';
export const USER_UPDATE_CLEANUP = 'USER_UPDATE_CLEANUP';

export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const REMOVE_ALL_CART_ITEMS = 'REMOVE_ALL_CART_ITEMS';
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';
export const UPDATE_ORDER_REQUEST = 'UPDATE_ORDER_REQUEST';
export const UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS';
export const UPDATE_ORDER_FAILURE = 'UPDATE_ORDER_FAILURE';
export const DELETE_ORDER_REQUEST = 'DELETE_ORDER_REQUEST';
export const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS';
export const DELETE_ORDER_FAILURE = 'DELETE_ORDER_FAILURE';
export const CANCEL_ORDER_REQUEST = 'CANCEL_ORDER_REQUEST';
export const CANCEL_ORDER_SUCCESS = 'CANCEL_ORDER_SUCCESS';
export const CANCEL_ORDER_FAILURE = 'CANCEL_ORDER_FAILURE';
export const LIST_ORDER_REQUEST = 'LIST_ORDER_REQUEST';
export const LIST_ORDER_SUCCESS = 'LIST_ORDER_SUCCESS';
export const LIST_ORDER_FAILURE = 'LIST_ORDER_FAILURE';
export const SAVE_ORDER_DETAILS = 'SAVE_ORDER_DETAILS';
export const LIST_MY_ORDERS_REQUEST = 'LIST_MY_ORDERS_REQUEST';
export const LIST_MY_ORDERS_SUCCESS = 'LIST_MY_ORDERS_SUCCESS';
export const LIST_MY_ORDERS_FAILURE = 'LIST_MY_ORDERS_FAILURE';
export const LIST_ORDER_DETAILS_REQUEST = 'LIST_ORDER_DETAILS_REQUEST';
export const LIST_ORDER_DETAILS_SUCCESS = 'LIST_ORDER_DETAILS_SUCCESS';
export const LIST_ORDER_DETAILS_FAILURE = 'LIST_ORDER_DETAILS_FAILURE';

//  Item interfaces

export interface ListItemsAction {
  type: typeof ITEM_LIST_REQUEST;
}
export interface ItemListSuccess {
  type: typeof ITEM_LIST_SUCCESS;
  payload: SingleItemType[];
}
export interface ItemListFailure {
  type: typeof ITEM_LIST_FAILURE;
  payload: string;
}
export interface ItemDetailsRequest {
  type: typeof ITEM_DETAILS_REQUEST;
  payload: IdType;
}
export interface ItemDetailsSuccess {
  type: typeof ITEM_DETAILS_SUCCESS;
  payload: SingleItemType;
}
export interface ItemDetailsFailure {
  type: typeof ITEM_DETAILS_FAILURE;
  payload: string;
}

export interface ItemSaveRequest {
  type: typeof ITEM_SAVE_REQUEST;
  payload: SaveItemRequest;
}
export interface ItemSaveSuccess {
  type: typeof ITEM_SAVE_SUCCESS;
  payload: SingleItemType;
}
export interface ItemSaveFailure {
  type: typeof ITEM_SAVE_FAILURE;
  payload: string;
}
export interface ItemUpdateRequest {
  type: typeof ITEM_UPDATE_REQUEST;
  payload: SaveItemRequest;
}
export interface ItemUpdateSuccess {
  type: typeof ITEM_UPDATE_SUCCESS;
  payload: SingleItemType;
}
export interface ItemUpdateFailure {
  type: typeof ITEM_UPDATE_FAILURE;
  payload: string;
}

export interface ItemDeleteRequest {
  type: typeof ITEM_DELETE_REQUEST;
  payload: IdType;
}
export interface ItemDeleteSuccess {
  type: typeof ITEM_DELETE_SUCCESS;
  payload: SingleItemType;
}
export interface ItemDeleteFailure {
  type: typeof ITEM_DELETE_FAILURE;
  payload: string;
}

//  User Interfaces

export interface UserListRequest {
  type: typeof USER_LIST_REQUEST;
}
export interface UserListSuccess {
  type: typeof USER_LIST_SUCCESS;
  payload: UserListType[];
}
export interface UserListFailure {
  type: typeof USER_LIST_FAILURE;
  payload: string;
}
export interface UserDeleteRequest {
  type: typeof USER_DELETE_REQUEST;
  payload: IdType;
}
export interface UserDeleteSuccess {
  type: typeof USER_DELETE_SUCCESS;
  payload: UserActions;
}
export interface UserDeleteFailure {
  type: typeof USER_DELETE_FAILURE;
  payload: string;
}
export interface UserLoginRequest {
  type: typeof USER_LOGIN_REQUEST;
  payload: LogInUserRequest;
}
export interface UserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: LogInUserType;
}
export interface UserLoginFailure {
  type: typeof USER_LOGIN_FAILURE;
  payload: string;
}
export interface UserLogoutRequest {
  type: typeof USER_LOGOUT_REQUEST;
}
export interface UserLogoutSuccess {
  type: typeof USER_LOGOUT_SUCCESS;
  payload: undefined;
}
export interface UserLogoutFailure {
  type: typeof USER_LOGOUT_FAILURE;
  payload: string;
}
export interface UserRegisterRequest {
  type: typeof USER_REGISTER_REQUEST;
  payload: RegisterUserRequest;
}
export interface UserRegisterSuccess {
  type: typeof USER_REGISTER_SUCCESS;
  payload: UserListType;
}
export interface UserRegisterFailure {
  type: typeof USER_REGISTER_FAILURE;
  payload: string;
}
export interface UserRegisterCleanup {
  type: typeof USER_REGISTER_CLEANUP;
  payload: undefined;
}
export interface UserUpdateRequest {
  type: typeof USER_UPDATE_REQUEST;
  payload: RegisterUserRequest;
}
export interface UserUpdateSuccess {
  type: typeof USER_UPDATE_SUCCESS;
  payload: UserListType;
}
export interface UserUpdateFailure {
  type: typeof USER_UPDATE_FAILURE;
  payload: string;
}
export interface UserUpdateCleanup {
  type: typeof USER_UPDATE_CLEANUP;
  payload: undefined;
}
//  Cart interfaces:

export interface AddItemToCart {
  type: typeof ADD_ITEM_TO_CART;
  payload: CartPayload;
}
export interface RemoveItemFromCart {
  type: typeof REMOVE_ITEM_FROM_CART;
  payload: IdType;
}
export interface RemoveAllCartItems {
  type: typeof REMOVE_ALL_CART_ITEMS;
}

//  Orders

export interface OrderDetailsCart {
  type: typeof SAVE_ORDER_DETAILS;
  payload: OrderDetails;
}

export interface CreateOrderRequest {
  type: typeof CREATE_ORDER_REQUEST;
  payload: CheckOutOrderType;
}

export interface CreateOrderSuccess {
  type: typeof CREATE_ORDER_SUCCESS;
  payload: Order;
}

export interface CreateOrderFailure {
  type: typeof CREATE_ORDER_FAILURE;
  payload: string;
}

export interface UpdateOrderRequest {
  type: typeof UPDATE_ORDER_REQUEST;
  payload: Order;
}

export interface UpdateOrderSuccess {
  type: typeof UPDATE_ORDER_SUCCESS;
  payload: Order;
}

export interface UpdateOrderFailure {
  type: typeof UPDATE_ORDER_FAILURE;
  payload: string;
}

export interface CancelOrderRequest {
  type: typeof CANCEL_ORDER_REQUEST;
  payload: Order;
}

export interface CancelOrderSuccess {
  type: typeof CANCEL_ORDER_SUCCESS;
  payload: Order;
}

export interface CancelOrderFailure {
  type: typeof CANCEL_ORDER_FAILURE;
  payload: string;
}

export interface DeleteOrderRequest {
  type: typeof DELETE_ORDER_REQUEST;
  payload: IdType;
}

export interface DeleteOrderSuccess {
  type: typeof DELETE_ORDER_SUCCESS;
  payload: Order;
}

export interface DeleteOrderFailure {
  type: typeof DELETE_ORDER_FAILURE;
  payload: string;
}

export interface ListOrderRequest {
  type: typeof LIST_ORDER_REQUEST;
}

export interface ListOrderSuccess {
  type: typeof LIST_ORDER_SUCCESS;
  payload: Order[];
}

export interface ListOrderFailure {
  type: typeof LIST_ORDER_FAILURE;
  payload: string;
}
export interface ListOrderDetailsRequest {
  type: typeof LIST_ORDER_DETAILS_REQUEST;
}

export interface ListOrderDetailsSuccess {
  type: typeof LIST_ORDER_DETAILS_SUCCESS;
  payload: Order;
}

export interface ListOrderDetailsFailure {
  type: typeof LIST_ORDER_DETAILS_FAILURE;
  payload: string;
}

export interface ListMyOrdersRequest {
  type: typeof LIST_MY_ORDERS_REQUEST;
}

export interface ListMyOrdersSuccess {
  type: typeof LIST_MY_ORDERS_SUCCESS;
  payload: Order[];
}

export interface ListMyOrdersFailure {
  type: typeof LIST_MY_ORDERS_FAILURE;
  payload: string;
}

export type ItemActionTypes =
  | ListItemsAction
  | ItemListSuccess
  | ItemListFailure
  | ItemDetailsRequest
  | ItemDetailsSuccess
  | ItemDetailsFailure
  | ItemSaveRequest
  | ItemSaveSuccess
  | ItemSaveFailure
  | ItemUpdateRequest
  | ItemUpdateSuccess
  | ItemUpdateFailure
  | ItemDeleteRequest
  | ItemDeleteSuccess
  | ItemDeleteFailure;

export type CartActionTypes =
  | AddItemToCart
  | RemoveItemFromCart
  | RemoveAllCartItems

export type OrderActionTypes = 
| OrderDetailsCart
| CreateOrderRequest
| CreateOrderSuccess
| CreateOrderFailure
| ListOrderRequest
| ListOrderSuccess
| ListOrderFailure
| ListOrderDetailsRequest
| ListOrderDetailsSuccess
| ListOrderDetailsFailure
| ListMyOrdersRequest
| ListMyOrdersSuccess
| ListMyOrdersFailure
| UpdateOrderRequest
| UpdateOrderSuccess
| UpdateOrderFailure
| CancelOrderRequest
| CancelOrderSuccess
| CancelOrderFailure
| DeleteOrderRequest
| DeleteOrderSuccess
| DeleteOrderFailure

export type UserActionTypes =
  | UserListRequest
  | UserListSuccess
  | UserListFailure
  | UserDeleteRequest
  | UserDeleteSuccess
  | UserDeleteFailure
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFailure
  | UserRegisterRequest
  | UserRegisterSuccess
  | UserRegisterFailure
  | UserRegisterCleanup
  | UserUpdateRequest
  | UserUpdateSuccess
  | UserUpdateFailure
  | UserUpdateCleanup
  | UserLogoutRequest
  | UserLogoutSuccess
  | UserLogoutFailure

export type AppActions = ItemActionTypes | CartActionTypes | UserActionTypes | OrderActionTypes;
