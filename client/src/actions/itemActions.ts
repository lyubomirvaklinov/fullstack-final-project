import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_FAILURE,
  AppActions,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAILURE,
  ITEM_SAVE_REQUEST,
  ITEM_SAVE_SUCCESS,
  ITEM_SAVE_FAILURE,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_FAILURE,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAILURE,
} from '../const/item-constants';
import axios from 'axios';
import { Dispatch } from 'redux';
import { IdType } from '../shared/shared-types';
import { SingleItemType } from '../model/items-model';
import { ITEM_UPDATE_SUCCESS } from '../const/item-constants';
import {getStateType} from '../shared/shared-types';



const listItems = () => async (dispatch: Dispatch<AppActions>) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST });
    const { data } = await axios.get('/api/items');
    dispatch({ type: ITEM_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ITEM_LIST_FAILURE, payload: err.message });
  }
};

const detailsItem = (itemId: IdType) => async (
  dispatch: Dispatch<AppActions>
) => {
  try {
    dispatch({ type: ITEM_DETAILS_REQUEST, payload: itemId });
    const { data } = await axios.get(`/api/items/${itemId}`);
    dispatch({ type: ITEM_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ITEM_DETAILS_FAILURE, payload: err.message });
  }
};

const saveItem = (newItem: SingleItemType) => async (
  dispatch: Dispatch<AppActions>,
  getState: getStateType
) => {
  try {
    dispatch({ type: ITEM_SAVE_REQUEST, payload: newItem });
    const {
      userLogging: { userInfo },
    } = getState();
    if (userInfo) {
      const { data } = await axios.post('/api/items/manage-items', newItem,  {
        headers: { 'Authorization': 'Bearer ' + userInfo.token },
      });
      dispatch({ type: ITEM_SAVE_SUCCESS, payload: data });
    }
  } catch (err) {
    dispatch({ type: ITEM_SAVE_FAILURE, payload: err.message });
  }
};
const updateItem = (itemToUpdate: SingleItemType) => async (
  dispatch: Dispatch<AppActions>,
  getState: getStateType
) => {
  try {
    dispatch({ type: ITEM_UPDATE_REQUEST, payload: itemToUpdate });
    const {
      userLogging: { userInfo },
    } = getState();
    if (userInfo) {
      const { data } = await axios.put(
        `/api/items/edit-item/${itemToUpdate._id}`,
        itemToUpdate,
        {
          headers: { 'Authorization': 'Bearer ' + userInfo.token },
        }
      );
      dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
    }
  } catch (err) {
    dispatch({ type: ITEM_UPDATE_FAILURE, payload: err.message });
  }
};


const deleteItem = (itemId: IdType) => async (
  dispatch: Dispatch<AppActions>,
  getState: getStateType
) => {
  try {
    const {
      userLogging: { userInfo },
    } = getState();
    dispatch({ type: ITEM_DELETE_REQUEST, payload: itemId });
    const { data } = await axios.delete(`/api/items/${itemId}`, {
        headers: { 'Authorization': 'Bearer ' + userInfo?.token },
    });
    dispatch({ type: ITEM_DELETE_SUCCESS, payload: data, success: true });
  } catch (err) {
    dispatch({ type: ITEM_DELETE_FAILURE, payload: err.message });
  }
};


export { listItems, detailsItem, saveItem, updateItem, deleteItem };
