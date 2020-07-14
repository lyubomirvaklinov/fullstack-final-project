import React, { useEffect, ReactElement } from 'react';
import { IdType, ReduxState } from '../../shared/shared-types';
import { useParams, Link, useHistory } from 'react-router-dom';
import { addToCart, removeItemFromCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { CartPayload } from '../../model/cartTypes';
import useStyles from '../Profile/styles';
import {
  Button,
  Box,
  Grid,
  Typography,
  Divider,
  Paper,
} from '@material-ui/core';
import './CartView.css';

interface CartParams {
  id: IdType;
}

interface Props {}
export default function CartView({}: Props): ReactElement {
  const classes = useStyles();
  const { id } = useParams<CartParams>();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const qty = urlParams.get('qty');
  const size = urlParams.get('size');
  const history = useHistory();

  const sizeArr = size && size.split('');
  const dispatch = useDispatch();
  const cart = useSelector((state: ReduxState) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id && qty && sizeArr) {
      dispatch(addToCart(id, +qty, sizeArr));
    }
  }, []);

  const handleDeleteFromCart = (itemId: IdType) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleCheckout = () => {
    history.push(`/login?redirect=delivery-details`);
  };

  return (
    <Grid container spacing={1}>
      <Grid item sm={9}>
        <Typography variant="h5">
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            fontWeight="fontWeightBold"
            p={3}
            m={2}
          >
            Shopping cart
          </Box>
          <Divider />
        </Typography>
        {cartItems.length === 0 ? (
          <Typography variant="h6">
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              fontWeight="fontWeightBold"
              p={3}
            >
              No Items In Cart
            </Box>
            <Divider />
          </Typography>
        ) : (
          cartItems.map((item: CartPayload) => (
            <Box key={item.id} style={{ minHeight: 150 }}>
              <Paper style={{ backgroundColor: 'transparent' }}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={item.imageUrl}
                      style={{ maxWidth: '9rem', maxHeight: '9rem' }}
                    />
                  </Grid>
                  <Grid item sm={10}>
                    <Link to={`/items/${item.id}`}>
                      Product: {item.itemName}
                    </Link>
                    <div>Size: {size}</div>
                    <div>Number of items: {item.qty}</div>
                    <h4>Price: {item.price} €</h4>
                    <Box m={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        onClick={() => handleDeleteFromCart(item.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Grid>
                  <Divider />
                </Grid>
              </Paper>
            </Box>
          ))
        )}
      </Grid>
      <Grid item sm={3}>
        <Box m={5}>
          <Paper style={{ minWidth: 250, minHeight: 170 }}>
            <Typography variant="h6">
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                fontWeight="fontWeightBold"
                p={3}
              >
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items):{' '}
                <Box>
                  {' '}
                  {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} €{' '}
                </Box>
              </Box>
              <Divider />
            </Typography>
            <Box m={1} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Proceed To Checkout
              </Button>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
