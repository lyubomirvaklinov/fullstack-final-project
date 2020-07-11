import React, { ReactElement, useEffect, useState } from 'react';
import { Grid, Typography, Divider, Button, Box, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReduxState, LoggingActions } from '../../shared/shared-types';
import { AddToCartReducerState } from '../../shared/cartTypes';
import { createOrder, listOrders } from '../../actions/orderActions';
import useStyles from './styles';
import { CheckOutOrderType } from '../../shared/orderTypes';

interface Props {}

export default function CheckOut({}: Props): ReactElement {
  const cart: AddToCartReducerState = useSelector(
    (state: ReduxState) => state.cart
  );

  const { cartItems } = cart;

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const deliveryPrice = itemsPrice < 50 ? 0.15 * itemsPrice : 0;
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

  const handleSubmit = () => {
    dispatch(createOrder(order));
    setRedirect(true);
  };

  return (
    <Box mt={5}>
      <Grid
        container
        direction="column"
        spacing={1}
        style={{ maxWidth: 400, margin: '0 auto' }}
      >
         <Paper className={classes.control}>
        <Box
          paddingBottom={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
         
          <Typography variant="h4">Your Order Details</Typography>
        </Box>
        <Divider />
        <Box mt={5}>
          <Box
            paddingBottom={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5">Full Name: </Typography>
          </Box>
          <Box
            paddingBottom={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle1">
              {details?.firstName} {details?.lastName}
            </Typography>
          </Box>
          <Box
            paddingBottom={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5"> E-mail:</Typography>
          </Box>
          <Box
            paddingBottom={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle1">{details?.email}</Typography>
          </Box>
          <Box
            paddingBottom={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5">Payment:</Typography>
          </Box>
          <Box
            paddingBottom={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle1">Cash on delivery</Typography>
          </Box>
          <Box
            paddingBottom={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5"> Additional Information:</Typography>
          </Box>
          <Box
            paddingBottom={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle1">
              {details?.additionalInfo}
            </Typography>
          </Box>
          <Box
            paddingBottom={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5">Subtotal: {totalPrice} lv.</Typography>
          </Box>
        </Box>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: 'auto' }}
        >
          Check Out
        </Button>
      </Grid>
    </Box>
  );
}
