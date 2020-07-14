import axios from 'axios';
import { getStateType, IdType } from '../shared/shared-types';
import { Dispatch } from 'redux';
import {
  AppActions,
  SAVE_ORDER_DETAILS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  LIST_ORDER_REQUEST,
  LIST_ORDER_SUCCESS,
  LIST_ORDER_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  LIST_MY_ORDERS_REQUEST,
  LIST_MY_ORDERS_SUCCESS,
  LIST_MY_ORDERS_FAILURE,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAILURE,
  LIST_ORDER_DETAILS_REQUEST,
} from '../const/item-constants';
import { OrderDetails, Order, CheckOutOrderType } from '../model/orderTypes';
import moment from 'moment';
import { LIST_ORDER_DETAILS_SUCCESS, LIST_ORDER_DETAILS_FAILURE } from '../const/item-constants';

const saveOrderDetails = (details: OrderDetails) => async (
  dispatch: Dispatch<AppActions>
) => {
  localStorage.setItem("order-details", JSON.stringify(details));
  dispatch({ type: SAVE_ORDER_DETAILS, payload: details });
};

const createOrder = (order: CheckOutOrderType) => async (
  dispatch: Dispatch<AppActions>,
  getState: getStateType
) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST, payload: order });
    const {
      userLogging: { userInfo },
    } = getState();
    if (userInfo) {
      const {
        data: { data: newOrder },
      } = await axios.post('/api/orders', order, {
        headers: {
          Authorization: ' Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: newOrder });
    }
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
  }
};


const updateOrder = (order: Order) => async (
  dispatch: Dispatch<AppActions>,
  getState: getStateType
) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST, payload: order });
    const {
      userLogging: { userInfo },
    } = getState();
    if (userInfo) {
      const {
        data: { data: newOrder },
      } = await axios.put(`/api/orders/approve/${order._id}`, order, {
        headers: {
          Authorization: ' Bearer ' + userInfo.token,
        },
      });

      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: newOrder });

    }
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAILURE, payload: error.message });
  }
};

const cancelOrder = (order: Order) => async (
  dispatch: Dispatch<AppActions>,
  getState: getStateType
) => {
  try {
    dispatch({ type: CANCEL_ORDER_REQUEST, payload: order });
    const {
      userLogging: { userInfo },
    } = getState();
    if (userInfo) {
      const {
        data: { data: newOrder },
      } = await axios.put(`/api/orders/cancel-request/${order._id}`, order, {
        headers: {
          Authorization: ' Bearer ' + userInfo.token,
        },
      });

      dispatch({ type: CANCEL_ORDER_SUCCESS, payload: newOrder });

    }
  } catch (error) {
    dispatch({ type: CANCEL_ORDER_FAILURE, payload: error.message });
  }
};

const deleteOrder = (orderId: IdType) => async (
  dispatch: Dispatch<AppActions>,
  getState: getStateType
) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST, payload: orderId });
    const {
      userLogging: { userInfo },
    } = getState();
    if (userInfo) {
      const {
        data: { data: newOrder },
      } = await axios.delete(`/api/orders/delete/${orderId}`, {
        headers: {
          Authorization: ' Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: DELETE_ORDER_SUCCESS, payload: newOrder });

    }
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
  }
};

const listOrders = () => async (dispatch: Dispatch<AppActions>,
  getState: getStateType) => {

  try {
    dispatch({ type: LIST_ORDER_REQUEST });
    const { userLogging: { userInfo } } = getState();
    if(userInfo) {
      const { data } = await axios.get("/api/orders", {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      const result = data.map((order:any) => {order.createdAt = new Date(order.createdAt)
      return order as Order;
      }) as Order [];
      dispatch({ type: LIST_ORDER_SUCCESS, payload: result })
    }
  } catch (error) {
    dispatch({ type: LIST_ORDER_FAILURE, payload: error.message });
  }
}

const listMyOrders = () => async (dispatch: Dispatch<AppActions>,
  getState: getStateType) => {

  try {
    dispatch({ type: LIST_MY_ORDERS_REQUEST });
    const { userLogging: { userInfo } } = getState();
    if(userInfo) {
      const { data } = await axios.get("/api/orders/my-orders", {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
  
      const result = data.map((order:any) => {order.createdAt = new Date(order.createdAt)
      return order as Order;
      }) as Order [];
      dispatch({ type: LIST_MY_ORDERS_SUCCESS, payload: result })
    }
  } catch (error) {
    dispatch({ type:LIST_MY_ORDERS_FAILURE, payload: error.message });
  }
}
const listOrderDetails = (orderId: IdType) => async (dispatch: Dispatch<AppActions>,
  getState: getStateType) => {

  try {
    dispatch({ type: LIST_ORDER_DETAILS_REQUEST });
    const { userLogging: { userInfo } } = getState();
    if(userInfo) {
      const { data } = await axios.get(`/api/orders/order/${orderId}`, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });

      dispatch({ type: LIST_ORDER_DETAILS_SUCCESS, payload: data })
    }
  } catch (error) {
    dispatch({ type:LIST_ORDER_DETAILS_FAILURE, payload: error.message });
  }
}

export {saveOrderDetails, createOrder, listOrders, listMyOrders, listOrderDetails, updateOrder, deleteOrder, cancelOrder }