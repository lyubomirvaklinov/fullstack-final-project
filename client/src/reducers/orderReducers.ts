import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  AppActions,
  LIST_ORDER_REQUEST,
  LIST_ORDER_SUCCESS,
  LIST_ORDER_FAILURE,
  SAVE_ORDER_DETAILS,
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
} from '../const/item-constants';
import { OrderCreate, OrderDelete } from '../shared/orderTypes';
import { OrderDetails } from '../shared/orderTypes';


const orderCreateState: OrderCreate = { loading: false };

const orderCreateReducer = (state = orderCreateState, action: AppActions) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case CREATE_ORDER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const orderUpdateReducer = (state = orderCreateState, action: AppActions) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return { loading: true };
    case UPDATE_ORDER_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case UPDATE_ORDER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const orderCancelReducer = (state = orderCreateState, action: AppActions) => {
  switch (action.type) {
    case CANCEL_ORDER_REQUEST:
      return { loading: true };
    case CANCEL_ORDER_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case CANCEL_ORDER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const orderDeleteState: OrderDelete = { loading: false };

const orderDeleteReducer = (state = orderDeleteState, action: AppActions) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      return { loading: true };
    case DELETE_ORDER_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case DELETE_ORDER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const orderDetailsReducerState: OrderDetails = {};

const orderDetailsReducer = (state = orderDetailsReducerState, action: AppActions) => {
  switch (action.type) {
    case SAVE_ORDER_DETAILS:
      return { details: action.payload };
    default:
      return state;
  }
};

const orderListReducer = (state = orderCreateState, action: AppActions) => {
  switch (action.type) {
    case LIST_ORDER_REQUEST:
      return { loading: true };
    case LIST_ORDER_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case LIST_ORDER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const myOrdersListReducer = (state = orderCreateState, action: AppActions) => {
  switch (action.type) {
    case LIST_MY_ORDERS_REQUEST:
      return { loading: true };
    case LIST_MY_ORDERS_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case LIST_MY_ORDERS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { orderCreateReducer, orderListReducer, orderDetailsReducer, orderUpdateReducer, orderDeleteReducer, myOrdersListReducer, orderCancelReducer };
