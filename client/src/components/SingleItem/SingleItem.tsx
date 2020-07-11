import React, { ReactElement, useState } from 'react';
import { Item, SingleItemType } from '../../model/items-model';
import {
  ItemListener,
  UserActions,
  ReduxState,
  LoggingActions,
} from '../../shared/shared-types';
import Paper from '@material-ui/core/Paper';
import { Button, Box, TextField, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import useStyles from '../ItemsList/styles';
import EditIcon from '@material-ui/icons/Edit';

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import './SingleItem.css';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem } from '../../actions/itemActions';

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
    <Grid item style={{ minWidth: 400 }}>
      <div>
        <Paper className={classes.control}>
          {/* style={{backgroundColor: 'transparent'}} */}
          <div className="product">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Link to={`${match.url}/${item._id}`}>
                <img
                  className="product-image"
                  src={item.imageUrl}
                  alt="product"
                />
              </Link>
            </Box>
            <Divider />{' '}
            <div className="product-name">
              <Link to={`${match.url}/${item._id}`}>{item.itemName}</Link>
            </div>
            <div className="product-description">{item.description}</div>
            <div className="product-price">{item.price} lv.</div>
            <div className="product-rating">4.5 Stars (10 Reviews)</div>
          </div>
        </Paper>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Box>
            {userInfo?.user.isAdmin && (
              <>
                <EditIcon onClick={handleUpdate} />
                <DeleteIcon onClick={handleDelete} />
              </>
            )}
          </Box>
          <Link to={`${match.url}/${item._id}`}>
            <Box display="flex" justifyContent="flex-end">
              <Button type="submit">Details</Button>
            </Box>
          </Link>
        </Box>
      </div>
    </Grid>
  );
}
