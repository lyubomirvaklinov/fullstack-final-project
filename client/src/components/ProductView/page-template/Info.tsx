import React, { ReactElement, useState } from 'react';
import { SingleItemType } from '../../../model/items-model';
import {
  Grid,
  Typography,
  Divider,
  Button,
  Box,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IdType } from '../../../shared/shared-types';
import useStyles from '../../Profile/styles';
import { FieldArray, Formik, useField, FieldAttributes, Field } from 'formik';
import Select, { ValueType } from 'react-select';

interface Props {
  info: SingleItemType;
  id: IdType;
}

export type OptionQtyType = {
  label: number;
  value: number;
};
type OptionSizeType = {
  label: string;
  value: string;
};

export default function Info({ info, id }: Props): ReactElement {
  const { itemName, description, price, category, size, itemsInStock } = info;
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const arrQty = [...Array(+itemsInStock).keys()];

  const optionsQty = arrQty.map((qty) => ({
    label: qty + 1,
    value: qty + 1,
  })) as OptionQtyType[];
  const optionsSize = size.map((s) => ({
    label: s,
    value: s,
  })) as OptionSizeType[];

  const [qty, setQty] = useState<ValueType<OptionQtyType>>(null);
  const [sizeChosen, setSizeChosen] = useState<ValueType<OptionSizeType>>(null);

  const handleAddToCart = () => {
    if (qty && sizeChosen) {
      const qtyVal = qty as OptionQtyType;
      const sizeVal = sizeChosen as OptionSizeType;
      history.push(`/cart/${id}?qty=${qtyVal.value}&size=${sizeVal.value}`);
    }
  };

  return (
    <Grid container direction="column" style={{ height: '100%' }}>
      <Typography variant="h6"><Box fontWeight="fontWeightMedium">{category} Clothing </Box></Typography>
      <Divider />
      <Box mt={1}>
        <Box p={1}>
          <Typography variant="h6"><Box fontWeight="fontWeightMedium">Item:</Box></Typography>
          <Box fontStyle="italic" fontSize={20}>{itemName}</Box>
        </Box>
        
        <Box p={1}>
          <Typography variant="h6"><Box fontWeight="fontWeightMedium">Description:</Box></Typography>
          <Box fontStyle="italic" fontSize={20}>{description}</Box>
        </Box>
        <Box p={1}>
          <Typography variant="h6"><Box fontWeight="fontWeightMedium">Price:</Box></Typography>
          <Box fontStyle="italic" fontSize={20}>{price} €</Box>
        </Box>
        <Divider />
        {itemsInStock && itemsInStock > 0 ? (
          <Box m={1}>
            <Typography variant="h6">Qty:</Typography>

            <Select options={optionsQty} onChange={setQty} />
            <Typography variant="h6">Size:</Typography>

            <Select options={optionsSize} onChange={setSizeChosen} />
          </Box>
        ) : (
          <Box m={3}>
            <Typography variant="h4">Out Of Stock!</Typography>
          </Box>
        )}
          {itemsInStock && itemsInStock > 0 && (
        <Box m={1} mt={2}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={classes.btn}
              onClick={handleAddToCart}
            >
              Purchase
            </Button>
            <Button
              type="button"
              className={classes.btn2}
              onClick={() => history.push('/items')}
            >
              Back
            </Button>
        </Box>
          )}
      </Box>
    </Grid>
  );
}
