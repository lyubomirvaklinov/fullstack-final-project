import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAILURE,
  ItemActionTypes,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAILURE,
  ITEM_SAVE_REQUEST,
  ITEM_SAVE_SUCCESS,
  ITEM_SAVE_FAILURE,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAILURE,
  ITEM_DELETE_FAILURE,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_REQUEST,
} from '../const/item-constants';
import {
  ItemAppState,
  ItemListActions,
  ItemDetailsActions,
  ItemDetailsState,
  ItemSaveState,
  ItemDeleteActions
} from '../model/itemTypes';

const itemState: ItemAppState = { loading: true, result: [], error: '' };

function itemListReducer(
  state = itemState,
  action: ItemActionTypes
): ItemListActions {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { loading: true, result: [] };
    case ITEM_LIST_SUCCESS:
      return { loading: false, result: action.payload };
    case ITEM_LIST_FAILURE:
      return { loading: false, result: [], error: action.payload };
    default:
      return state;
  }
}

const itemDetailsState: ItemDetailsState = {
  loading: true,
  result: {
    _id: '',
    itemName: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    size: [],
    itemsInStock: 0,
  },
  error: '',
};

function itemDetailsReducer(
  state = itemDetailsState,
  action: ItemActionTypes
): ItemDetailsActions {
  switch (action.type) {
    case ITEM_DETAILS_REQUEST:
      return {
        loading: true,
        result: {
          _id: '',
          itemName: '',
          description: '',
          price: 0,
          imageUrl: '',
          category: '',
          size: [],
          itemsInStock: 0,
        },
      };
    case ITEM_DETAILS_SUCCESS:
      return { loading: false, result: action.payload };
    case ITEM_DETAILS_FAILURE:
      return {
        loading: false,
        result: {
          _id: '',
          itemName: '',
          description: '',
          price: 0,
          imageUrl: '',
          category: '',
          size: [],
          itemsInStock: 0,
        },
        error: action.payload,
      };
    default:
      return state;
  }
}

const itemSaveState: ItemSaveState = { loading: false };

function itemSaveReducer(
  state = itemSaveState,
  action: ItemActionTypes
): ItemSaveState {
  switch (action.type) {
    case ITEM_SAVE_REQUEST:
      return { loading: true };
    case ITEM_SAVE_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case ITEM_SAVE_FAILURE:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
}

const itemUpdateState: ItemSaveState = { loading: false };

function itemUpdateReducer(
  state = itemUpdateState,
  action: ItemActionTypes
): ItemSaveState {
  switch (action.type) {
    case ITEM_UPDATE_REQUEST:
      return { loading: true };
    case ITEM_UPDATE_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case ITEM_UPDATE_FAILURE:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
}
const itemDeleteState: ItemDetailsState = {
  loading: true,
  result: {
    _id: '',
    itemName: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    size: [],
    itemsInStock: 0,
  },
  error: '',
};

function itemDeleteReducer(
  state = itemDeleteState,
  action: ItemActionTypes
): ItemDeleteActions {
  switch (action.type) {
    case ITEM_DELETE_REQUEST:
      return {
        loading: true,
        result: {
          _id: '',
          itemName: '',
          description: '',
          price: 0,
          imageUrl: '',
          category: '',
          size: [],
          itemsInStock: 0,
        },
      };
    case ITEM_DELETE_SUCCESS:
      return { loading: false, result: action.payload, success: true };
    case ITEM_DELETE_FAILURE:
      return {
        loading: false,
        result: {
          _id: '',
          itemName: '',
          description: '',
          price: 0,
          imageUrl: '',
          category: '',
          size: [],
          itemsInStock: 0,
        },
        error: action.payload,
      };
    default:
      return state;
  }
}

export { itemListReducer, itemDetailsReducer, itemSaveReducer, itemUpdateReducer, itemDeleteReducer };
