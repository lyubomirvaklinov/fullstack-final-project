import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
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
import { ReduxState } from '../../../shared/shared-types';
import {
  listOrders,
  updateOrder,
  deleteOrder,
} from '../../../actions/orderActions';
import { OrderItem, OrderCreate } from '../../../model/orderTypes';
import moment from 'moment';

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

export default function AdminOrderView({}: Props): ReactElement {
  const orderList: OrderCreate = useSelector(
    (state: ReduxState) => state.listOrders
  );

  const deletedOrder: OrderCreate = useSelector(
    (state: ReduxState) => state.deleteOrders
  );
  const updatedOrder: OrderCreate = useSelector(
    (state: ReduxState) => state.updateOrder
  );
  const arrItems: any = [];
  if(orderList.order) {
    const itemsOrdered = orderList.order.map(o => o.orderItems)
  }

  console.log(orderList)

  const classes = useStyles();

  const dispatch = useDispatch();

  const rows = orderList.order?.map((item) =>
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
    dispatch(listOrders());
  }, [deletedOrder?.success, updatedOrder?.success]);

  return (
    <>
      <Typography variant="h4">
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          fontWeight="fontWeightBold"
          p={3}
          m={2}
        >
         Orders
        </Box>
        <Divider />
      </Typography>
      
      {orderList.order?.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          p={10}
          mt={3}
        >
          <h1>There Are No Active Orders</h1>
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
                    <StyledTableCell>Order ID</StyledTableCell>
                    <StyledTableCell>User ID</StyledTableCell>
                    <StyledTableCell align="center">
                      Total Price
                    </StyledTableCell>
                    <StyledTableCell align="center">Created At</StyledTableCell>
                    <StyledTableCell align="center">Delivery:</StyledTableCell>
                    <StyledTableCell align="center">Requests:</StyledTableCell>
                    <StyledTableCell align="center">
                      Approve/Remove
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    ?.sort((a, b) => {
                      return a.isCancelled === b.isCancelled
                        ? 0
                        : a.isCancelled
                        ? -1
                        : 1;
                    })
                    .map((row) => (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                          {row._id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.user}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.totalPrice} €
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {moment(row.createdAt.toString()).format(
                            'MMMM Do YYYY, h:mm:ss a'
                          )}
                        </StyledTableCell>
                        {row.isDelivered ? (
                          <StyledTableCell align="center">
                            On The Way!
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell align="center">
                            Pending
                          </StyledTableCell>
                        )}
                        {row.isCancelled ? (
                          <StyledTableCell align="center">
                            Please Cancel My Order!
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell align="center">
                            All Good!
                          </StyledTableCell>
                        )}
                        <StyledTableCell>
                          <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <CheckIcon
                              style={{ marginTop: '15', color: "#659D32" }}
                              onClick={() => {
                                dispatch(updateOrder(row));
                              }}
                            />
                            <DeleteIcon
                              style={{ marginTop: '15', color: '	#a70000' }}
                              onClick={() => dispatch(deleteOrder(row._id))}
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
