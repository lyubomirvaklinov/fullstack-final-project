import { ADD_ITEM_TO_CART, AppActions, REMOVE_ITEM_FROM_CART, REMOVE_ALL_CART_ITEMS } from '../const/item-constants';
import { AddToCartReducerState, CartPayload } from '../model/cartTypes';

const cartState: AddToCartReducerState = {
  cartItems: [],
};

const cartReducer = (state = cartState, action: AppActions) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:

      const item = action.payload;
      const doesItemExist:CartPayload | undefined = state.cartItems.find(
        (curr: CartPayload) => curr.id === item.id
      );

      if (doesItemExist) {
        return { cartItems: state.cartItems.map((existingItem: CartPayload) => existingItem.id === doesItemExist?.id ? item : existingItem)}
      } 
      return { cartItems: [...state.cartItems, item]};
      case REMOVE_ITEM_FROM_CART:
        return {cartItems: state.cartItems.filter(item => item.id !== action.payload)}
      case REMOVE_ALL_CART_ITEMS:
        return {cartItems: []}
      default:
        return state;
  }
};

export { cartReducer };
