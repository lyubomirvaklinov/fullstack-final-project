import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
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
import { ReduxState } from '../../shared/shared-types';
import { listUsers, deleteUser } from '../../actions/userActions';
import { UserListActions } from '../../shared/userType';

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
  email: string,
  isAdmin: boolean,
  name: string
) {
  return {
    _id,
    email,
    isAdmin,
    name,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

interface Props {}

export default function UserManagement({}: Props): ReactElement {
  const usersList: UserListActions = useSelector(
    (state: ReduxState) => state.userList
  );
  const usersDelete: UserListActions = useSelector(
    (state: ReduxState) => state.userDelete
  );

  const { userInfo } = usersList;
  const classes = useStyles();
  const dispatch = useDispatch();

  const rows = userInfo?.map((user) =>
    createData(user._id, user.email, user.isAdmin, user.name)
  );

  useEffect(() => {
    dispatch(listUsers());
  }, [usersDelete.success]);

  return usersList.userInfo?.length === 0 ? (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      p={10}
      mt={10}
    >
      <h1>No User's To Manage</h1>
    </Box>
  ) : (
    <Grid item xs={12} style={{ maxWidth: 1500, margin: '0 auto' }}>
      <Box display="flex" flexDirection="column" flexWrap="wrap" p={10} mt={10}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User ID</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">E-mail</StyledTableCell>
                <StyledTableCell align="right">Requests</StyledTableCell>
                <StyledTableCell align="right">Operations</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row._id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">Request</StyledTableCell>
                  <StyledTableCell align="center">
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <DeleteIcon
                        onClick={() => {
                          dispatch(deleteUser(row._id));
                        }}
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
