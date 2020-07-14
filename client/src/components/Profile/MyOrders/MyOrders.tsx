import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import {
  createStyles,
  withStyles,
  TableCell,
  TableRow,
  Theme,
  makeStyles,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Box,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import {
  ReduxState,
  IdType,
} from '../../../shared/shared-types';
import { listMyOrders, cancelOrder, listOrderDetails } from '../../../actions/orderActions';
import { OrderItem, OrderCreate } from '../../../model/orderTypes';
import InfoIcon from '@material-ui/icons/Info';
import { useHistory, Link } from 'react-router-dom';
import { LoggingActions } from '../../../model/userType';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function createData(
  _id: string,
  user: string,
  createdAt: Date,
  isDelivered: any,
  isCancelled: boolean,
  orderItems: OrderItem[],
  totalPrice: number,
  updatedAt: string
) {
  return {
    _id,
    user,
    createdAt,
    isDelivered,
    isCancelled,
    orderItems,
    totalPrice,
    updatedAt,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

interface Props {}

export default function MyOrders({}: Props): ReactElement {
  const myOrderList: OrderCreate = useSelector(
    (state: ReduxState) => state.listMyOrders
  );
  
  const userLoggedIn: LoggingActions = useSelector(
    (state: ReduxState) => state.userLogging
  );

  const cancelledOrder: OrderCreate = useSelector(
    (state: ReduxState) => state.cancelOrder
  );

  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();

  const rows = myOrderList.order?.map((item) =>
    createData(
      item._id,
      item.user,
      item.createdAt,
      item.isDelivered,
      item.isCancelled,
      item.orderItems,
      item.totalPrice,
      item.updatedAt
    )
  );

  useEffect(() => {
    if (cancelledOrder?.success) {
      dispatch(listMyOrders());
    }
    dispatch(listMyOrders());
  }, [cancelledOrder?.success]);

  const handleInfoClick = (id: IdType) => {
    history.push(`/order/${id}`);
  };

  return (
    <>
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
          My Orders
        </Box>
        <Divider />
      </Typography>
      {myOrderList.order?.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          p={10}
          mt={3}
        >
          <h1>You Have No Active Orders</h1>
        </Box>
      ) : (
        <Grid item xs={12} style={{ maxWidth: 1500, margin: '0 auto' }}>
          <Box
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            p={10}
            mt={3}
          >
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Info</StyledTableCell>
                    <StyledTableCell align="center">User</StyledTableCell>
                    <StyledTableCell align="center">
                      Total Price
                    </StyledTableCell>
                    <StyledTableCell align="center">Created At</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">
                      Cancel Order
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    ?.sort((a, b) => {
                      return !a.isCancelled === !b.isCancelled
                        ? 0
                        : !a.isCancelled
                        ? -1
                        : 1;
                    })
                    .map((row) => (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                          {/* {row._id} */}
                          <InfoIcon onClick={() => handleInfoClick(row._id)} />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {userLoggedIn.userInfo?.user.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.totalPrice} lv
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {moment(row.createdAt.toString()).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
                        </StyledTableCell>
                        {row.isCancelled ? (
                          <StyledTableCell align="center">
                            Cancellation Requested
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell align="center">
                            Active
                          </StyledTableCell>
                        )}
                        <StyledTableCell>
                          <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <DeleteIcon
                              style={{ marginTop: '3', color: '	#a70000' }}
                              onClick={() => dispatch(cancelOrder(row))}
                            />
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      )}
    </>
  );
}
