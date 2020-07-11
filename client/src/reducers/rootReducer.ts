import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { itemListReducer, itemDetailsReducer, itemSaveReducer, itemUpdateReducer, itemDeleteReducer } from './itemListReducer';
import { cartReducer } from './cartReducers';
import { userRegisterReducer, userLoggingReducer, usersListReducer, userDeleteReducer, userUpdateReducer } from './userReducers';
import { orderCreateReducer, orderListReducer, orderDetailsReducer, orderDeleteReducer, orderUpdateReducer, myOrdersListReducer, orderCancelReducer } from './orderReducers';


const rootPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cart', 'userLogging']
}


const rootReducer = combineReducers({
  itemList: itemListReducer,
  itemDetails: itemDetailsReducer,
  itemSave: itemSaveReducer,
  itemUpdate: itemUpdateReducer,
  itemDelete: itemDeleteReducer,
  cart: cartReducer,
  userLogging: userLoggingReducer,
  userRegister: userRegisterReducer,
  userList: usersListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  createOrder: orderCreateReducer,
  listOrders: orderListReducer,
  listMyOrders: myOrdersListReducer,
  updateOrder: orderUpdateReducer,
  deleteOrders: orderDeleteReducer,
  orderDetails: orderDetailsReducer, 
  cancelOrder: orderCancelReducer
});

export default persistReducer(rootPersistConfig, rootReducer);