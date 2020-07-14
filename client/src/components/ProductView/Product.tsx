import React, { ReactElement, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Image from './page-template/Image';
import Info from './page-template/Info';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailsItem } from '../../actions/itemActions';
import { ReduxState, IdType } from '../../shared/shared-types';
import { Box  } from '@material-ui/core';

interface Props {}

interface ProductParams {
  id: IdType;
}

export default function Product({}: Props): ReactElement {
  const { id } = useParams<ProductParams>();
  const itemDetails = useSelector((state: ReduxState) => state.itemDetails);
  const { loading, result, error } = itemDetails;
  const { imageUrl } = result;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsItem(id));
  }, [id]);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Box style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Box m={10}>
          <Grid container spacing={1}>
            <Grid item sm={5}>
              <Image image={imageUrl} />
            </Grid>
            <Grid item sm={7}>
              <Info info={result} id={id} />
            </Grid>
          </Grid>
      </Box>
    </Box>
  );
}
