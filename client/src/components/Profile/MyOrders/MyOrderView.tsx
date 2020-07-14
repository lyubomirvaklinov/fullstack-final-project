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
import { useHistory, useParams } from 'react-router-dom';
import useStyles from '../styles';
import '../../Cart/CartView.css';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {
  ReduxState,
  IdType,
} from '../../../shared/shared-types';
import {  SingleOrderDetails } from '../../../model/orderTypes';
import { listOrderDetails, cancelOrder } from '../../../actions/orderActions';
import BlockIcon from '@material-ui/icons/Block';
import { LoggingActions } from '../../../model/userType';

interface Props {}
interface OrderParams {
  id: IdType;
}

export default function MyOrderView({}: Props): ReactElement {
  const { id } = useParams<OrderParams>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  let details;
  const detailsStorage = localStorage.getItem('order-details');
  if (detailsStorage) {
    details = JSON.parse(detailsStorage);
  }

  const userLoggedIn: LoggingActions = useSelector(
    (state: ReduxState) => state.userLogging
  );
  const { userInfo } = userLoggedIn;

  const orderInfo: SingleOrderDetails = useSelector(
    (state: ReduxState) => state.singleOrderDetails
  );
  const { order } = orderInfo;
 
  useEffect(() => {
    dispatch(listOrderDetails(id));
  }, []);

  const handleCancel = () => {
    if (orderInfo.order) {
      dispatch(cancelOrder(orderInfo.order));
      history.push('/my-orders');
    }
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

            {order?.orderItems.map((item) => (
              <Box key={item._id} style={{ minHeight: 150 }}>
                <Paper>
                  <Grid container>
                    <Grid item sm={2}>
                      <img
                        src={item.imageUrl}
                        style={{ maxWidth: '7rem', maxHeight: '8rem' }}
                      />
                    </Grid>
                    <Grid item sm={10}>
                      <Box mt={4}>
                      <div>Product: {item.itemName}</div>
                      <div>Number of items: {item.qty}</div>
                      <h4>Price: {item.price} €</h4>
                      </Box>
                    </Grid>
                    <Divider />
                  </Grid>
                </Paper>
              </Box>
            ))}
            <Box mt={5}>
              <Box m={1} display="flex">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={userInfo && `${userInfo.user.name}`} />
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
                <ListItemText
                  primary={
                    order && order.isDelivered ? 'On The Way' : 'Pending'
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
                  <ShoppingBasketIcon />
                </ListItemIcon>
                <ListItemText primary={`Total: ${order?.totalPrice} €`} />
              </Box>
              <Divider />
              <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <ListItemIcon>
                  <BlockIcon />
                </ListItemIcon>
                <ListItemText
                  primary={order && order.isCancelled ? 'Cancelled' : 'Active'}
                />
              </Box>
              <Box m={2} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={handleCancel}
                >
                  Cancel Order
                </Button>
              </Box>
              <Box m={2} display="flex" justifyContent="center">
                <Button

                  className={classes.btn2}
                  onClick={() => history.push('/my-orders')}
                >
                  Back
                </Button>
                </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
