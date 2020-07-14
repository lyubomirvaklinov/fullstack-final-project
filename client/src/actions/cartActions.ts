import axios from 'axios';
import { IdType, getStateType } from '../shared/shared-types';
import { Dispatch } from 'redux';
import {
  AppActions,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  REMOVE_ALL_CART_ITEMS
} from '../const/item-constants';

const addToCart = (id: IdType, qty: number, size: string[]) => async (
  dispatch: Dispatch<AppActions>
) => {
  try {
    const { data } = await axios.get(`/api/items/${id}`);

    dispatch({
      type: ADD_ITEM_TO_CART,
      payload: {
        id: data._id,
        itemName: data.itemName,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        category: data.category,
        size,
        itemsInStock: data.itemsInStock,
        qty,
      },
    });
  } catch (err) {}
};

const removeItemFromCart = (id: IdType) => async (
  dispatch: Dispatch<AppActions>
) => {
  const { data } = await axios.get(`/api/items/${id}`);
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: data._id,
  });
};

const removeAllCartItems = () => async (
  dispatch: Dispatch<AppActions>
) => {
  dispatch({
    type: REMOVE_ALL_CART_ITEMS,
  });
};



export { addToCart, removeItemFromCart, removeAllCartItems};
