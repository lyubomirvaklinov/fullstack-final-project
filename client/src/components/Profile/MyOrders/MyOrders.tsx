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
} from '@material-ui/core';
import { ReduxState } from '../../../shared/shared-types';
import {
  listMyOrders,
  deleteOrder,
  cancelOrder,
} from '../../../actions/orderActions';
import { OrderItem, OrderCreate } from '../../../shared/orderTypes';

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

  const cancelledOrder: OrderCreate = useSelector(
    (state: ReduxState) => state.cancelOrder
  );
  const classes = useStyles();

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

  return myOrderList.order?.length === 0 ? (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      p={10}
      mt={10}
    >
      <h1>You Have No Active Orders</h1>
    </Box>
  ) : (
    <Grid item xs={12} style={{ maxWidth: 1500, margin: '0 auto' }}>
      <Box display="flex" flexDirection="column" flexWrap="wrap" p={10} mt={10}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Order ID</StyledTableCell>
                <StyledTableCell>User ID</StyledTableCell>
                <StyledTableCell align="right">Total Price</StyledTableCell>
                <StyledTableCell align="right">Created At</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Cancel Order</StyledTableCell>
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
                      {row._id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.user}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.totalPrice} lv
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {moment(row.createdAt.toString()).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </StyledTableCell>
                    {row.isCancelled ? (
                      <StyledTableCell align="right">
                        Order Cancelled!
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell align="right">Pending</StyledTableCell>
                    )}
                    <StyledTableCell>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <DeleteIcon
                          style={{ marginTop: '15' }}
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
  );
}
