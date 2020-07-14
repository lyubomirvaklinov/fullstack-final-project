import React, { ReactElement } from 'react';
import { SingleItemType } from '../../model/items-model';
import { ReduxState } from '../../shared/shared-types';
import Paper from '@material-ui/core/Paper';
import { Button, Box, Divider, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import useStyles from '../Profile/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem } from '../../actions/itemActions';
import { LoggingActions } from '../../model/userType';

interface Props {
  item: SingleItemType;
  loading: boolean | undefined;
  error: string | undefined;
}

interface StringMap {
  [key: string]: string | number;
}

export default function SingleItem({
  item,
  loading,
  error,
}: Props): ReactElement {
  const classes = useStyles();
  const match = useRouteMatch();
  const history = useHistory();
  const userLogging: LoggingActions = useSelector(
    (state: ReduxState) => state.userLogging
  );

  const dispatch = useDispatch();

  const { userInfo } = userLogging;

  const handleDelete = () => {
    dispatch(deleteItem(item._id));
  };
  const handleUpdate = () => {
    history.push(`/edit-item/${item._id}`);
  };

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Grid item>
      <Paper
        className={classes.control}
        style={{ minWidth: 350, minHeight: 500, backgroundColor: '#fffffa' }}
      >
        {/* <div className="product"> */}
        <Box display="flex" justifyContent="center" alignItems="center">
          <Link to={`${match.url}/${item._id}`}>
            <img
              style={{ maxWidth: '20rem', maxHeight: '20rem' }}
              src={item.imageUrl}
            />
          </Link>
        </Box>
        <Divider />{' '}
        {item.itemsInStock && item.itemsInStock > 0 ? (
          <Typography variant="h4">
            <Box
              p={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontWeight="fontWeightBold"
            >
              {item.itemName}
            </Box>
          </Typography>
        ) : (
          <Typography variant="h4">
            <Box
              p={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontWeight="fontWeightBold"
            >
              Out of Stock
            </Box>
          </Typography>
        )}
        <Typography variant="h6">
          <Box
            display="flex"
            justifyContent="center"
            fontWeight="fontWeightMedium"
          >
            {item.price} €
          </Box>
        </Typography>
        <Box
          display="flex"
          mt={2}
          justifyContent="flex-start"
          fontWeight="fontWeightMedium"
        >
          <div>5 Stars (10 Reviews)</div>
        </Box>
        {/* </div> */}
      </Paper>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Box>
          {userInfo?.user.isAdmin && (
            <>
              <DeleteIcon onClick={handleDelete} style={{ color: '	#a70000' }} />
            </>
          )}
        </Box>
        <Box display="flex" justifyContent="flex-end">
          {userInfo?.user.isAdmin && (
            <Button
              type="button"
              className={classes.btn2}
              onClick={handleUpdate}
            >
              Edit
            </Button>
          )}
          <Link to={`${match.url}/${item._id}`}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.btn}
            >
              Details
            </Button>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
}
