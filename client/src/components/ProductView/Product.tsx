import React, { ReactElement, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Image from './page-template/Image';
import Info from './page-template/Info';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { detailsItem } from '../../actions/itemActions';
import { ReduxState, IdType } from '../../shared/shared-types';
import { Box } from '@material-ui/core';

interface Props {}

interface ProductParams {
  id: IdType;
}

export default function Product({}: Props): ReactElement {
  const { id } = useParams<ProductParams>();
  const itemDetails = useSelector((state: ReduxState) => state.itemDetails);
  const { loading, result, error } = itemDetails;
  const {
    itemName,
    description,
    price,
    // size,
    imageUrl,
    itemsInStock,
  } = result;
  console.log(itemDetails)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsItem(id));
  }, []);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Box m={5}>
      <Grid container spacing={1} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Grid item sm={5}>
          <Image image={imageUrl} />
        </Grid>
        <Grid item sm={7}>
          <Info info={result} id={id} />
        </Grid>
      </Grid>
    </Box>
  );
}
