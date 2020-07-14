import React, { ReactElement, useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Divider,
  Button,
  Box,
  Paper,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { ReduxState } from '../../shared/shared-types';
import { AddToCartReducerState, CartPayload } from '../../model/cartTypes';
import { createOrder } from '../../actions/orderActions';
import useStyles from '../Profile/styles';
import { CheckOutOrderType } from '../../model/orderTypes';
import { updateItem } from '../../actions/itemActions';
import '../Cart/CartView.css';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import HomeIcon from '@material-ui/icons/Home';

interface Props {}

export default function CheckOut({}: Props): ReactElement {
  const cart: AddToCartReducerState = useSelector(
    (state: ReduxState) => state.cart
  );

  const { cartItems } = cart;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const deliveryPrice = itemsPrice < 50 ? 5 : 0;
  const totalPrice = itemsPrice + deliveryPrice;
  const dispatch = useDispatch();
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  let details;
  const detailsStorage = localStorage.getItem('order-details');
  if (detailsStorage) {
    details = JSON.parse(detailsStorage);
  }

  const order: CheckOutOrderType = {
    orderItems: cartItems,
    totalPrice,
  };

  useEffect(() => {
    if (redirect) history.push('/thank-you');
  }, [redirect]);

  const handleCancel = () => {
    history.push('/items');
    localStorage.removeItem('order-details');
    window.location.reload(false);
  };

  const handleSubmit = () => {
    dispatch(createOrder(order));
    cartItems.forEach((i) => {
      if (i.itemsInStock < i.qty) {
        console.log('Not enough');
      } else {
        dispatch(
          updateItem({
            _id: i.id,
            itemName: i.itemName,
            description: i.description,
            price: i.price,
            imageUrl: i.imageUrl,
            category: i.category,
            size: i.size,
            itemsInStock: i.itemsInStock - i.qty,
          })
        );
      }
    });
    setRedirect(true);
  };

  return (
    <Box m={5}>
      <Grid
        container
        spacing={1}
        direction="column"
        style={{ maxWidth: 1100, margin: '0 auto' }}
      >
        <Grid item>
          <Paper className={classes.control}>
            <Typography variant="h5">
              <Box
                p={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontWeight="fontWeightBold"
              >
                Order Summary
              </Box>
            </Typography>
            <Divider />

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
                          style={{ maxWidth: '7rem', maxHeight: '8rem' }}
                        />
                      </Grid>
                      <Grid item sm={10}>
                        <Box mt={3}>
                          <div>Product: {item.itemName}</div>
                          <div>Size: {item.size}</div>
                          <div>Number of items: {item.qty}</div>
                          <h4>Price: {item.price} €</h4>
                        </Box>
                      </Grid>
                      <Divider />
                    </Grid>
                  </Paper>
                </Box>
              ))
            )}
            <Box mt={5}>
              <Box m={1} display="flex">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    details && `${details.firstName} ${details.lastName}`
                  }
                />
              </Box>
              <Divider />
              <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary={`${deliveryPrice} lev.`} />
              </Box>
              <Divider />
              <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <ListItemIcon>
                  <ShoppingBasketIcon />
                </ListItemIcon>
                <ListItemText primary={`Total: ${totalPrice} €`} />
              </Box>
              <Divider />
              <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <ListItemIcon>
                  {' '}
                  <HomeIcon />{' '}
                </ListItemIcon>
                <ListItemText primary={details && details.address} />
              </Box>{' '}
              <Box m={2} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={handleSubmit}
                >
                  Place Order
                </Button>
              </Box>
              <Box m={2} display="flex" justifyContent="center">
                <Button className={classes.btn2} onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
