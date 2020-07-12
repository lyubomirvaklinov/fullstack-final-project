import React, { ReactElement, useState } from 'react';
import { Item } from '../../../model/items-model';
import {
  Grid,
  Typography,
  Divider,
  Button,
  Box,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IdType } from '../../../shared/shared-types';

interface Props {
  info: Item;
  id: IdType;
}

export default function Info({ info, id }: Props): ReactElement {
  const { itemName, description, price, category, size, itemsInStock } = info;
  const dispatch = useDispatch();
  const history = useHistory();
  const [qty, setQty] = useState(1);

  const handleChange = (e: any) => {
    setQty(+e.target.value);
  };

  const handleAddToCart = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <Typography variant="h6">{category} Clothing </Typography>
      <Divider />
      <Box m={2} p={3}>
        <Typography variant="h6">Item:</Typography>
        <div>{itemName} </div>
        <Typography variant="h6">Description:</Typography>
        <div>{description} </div>
        <Typography variant="h6">Price:</Typography>
        <div>{price} lv.</div>
        <Typography variant="h6">Qty:</Typography>
        {itemsInStock && itemsInStock > 0 ? (
          <select value={qty} onChange={handleChange}>
            {itemsInStock &&
              [...Array(+itemsInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
          </select>
        ) : (
          <Box m={3}>
          <Typography variant="h4">Out Of Stock!</Typography>
          </Box>
        )}
        <Box mt={2}>
          {itemsInStock && itemsInStock > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
            >
              Purchase
            </Button>
          )}
        </Box>
      </Box>
    </Grid>
  );
}
