import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IdType, ReduxState } from '../../shared/shared-types';
import { useParams, Link } from 'react-router-dom';
import { addToCart, removeItemFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { CartPayload } from '../../shared/cartTypes';
import { Button } from '@material-ui/core';
import './CartView.css';

interface CartParams {
  id: IdType;
}

const CartView = ({ history, location }: RouteComponentProps): JSX.Element => {
  const { id } = useParams<CartParams>();
  const qty = location.search ? +location.search.split('=')[1] : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state: ReduxState) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, []);

  const handleDeleteFromCart = (itemId: IdType) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleCheckout = () => {
    history.push(`/login?redirect=delivery-details`);
  };

  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
          </li>
          {cartItems.length === 0 ? (
            <div>No Items In Cart</div>
          ) : (
            cartItems.map((item: CartPayload) => (
              <li key={item.id}>
                <div className="cart-image">
                  <img src={item.imageUrl} />
                </div>
                <div className="cart-name">
                  <Link to={`/items/${item.id}`}>Product: {item.itemName}</Link>
                  <div>Size: {item.size}</div>
                  <div>Number of items: {item.qty}</div>
                  <div>
                    Change number of items:
                    <select
                      value={item.qty}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        dispatch(addToCart(item.id, +e.target.value));
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <h4>Price: {item.price} lv.</h4>
                  <Button onClick={() => handleDeleteFromCart(item.id)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-subtotal">
        <h5>
          Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :{' '}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} lev.
        </h5>
        <Button disabled={cartItems.length === 0} onClick={handleCheckout}>
          Proceed To Checkout
        </Button>
      </div>
    </div>
  );
};

export default withRouter(CartView);
