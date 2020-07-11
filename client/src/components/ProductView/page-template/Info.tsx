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
  id: IdType
}

export default function Info({ info, id }: Props): ReactElement {
  const { itemName, description, price, size, imageUrl, itemsInStock } = info;
  const dispatch = useDispatch();
  const history = useHistory();
  const [qty, setQty] = useState(1);

  const handleChange = (e: any) => {
    setQty(+e.target.value);
  }

  const handleAddToCart = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <Typography variant="subtitle1">Category</Typography>
      <Divider />
      <Box mt={2}>
        <Typography variant="h4">{itemName}</Typography>
        <Typography variant="subtitle1">{description}</Typography>
        <Typography variant="h6">{price} lv.</Typography>
        <Typography variant="subtitle1">Qty:</Typography>
        <select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          value={qty}
          onChange={handleChange}
        >
          {itemsInStock && [...Array(+itemsInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
      </Box>
      <Button variant="contained" color="primary" style={{ marginTop: 'auto' }} onClick={handleAddToCart}>
        Purchase
      </Button>
    </Grid>
  );
}
