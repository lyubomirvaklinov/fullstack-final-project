import React, { ReactElement } from 'react';
import useStyles from './styles';
import Grid from '@material-ui/core/Grid';
import SingleItem from '../SingleItem/SingleItem';
import { ItemListProps } from '../../shared/shared-types';
import {Box} from '@material-ui/core';



export default function ItemsList({ items, ...rest }: ItemListProps): ReactElement {
  const classes = useStyles();

  return (
    <Box mt={3}>
    <Grid container className={classes.root} style={{ maxWidth: 1500, margin: '0 auto' }}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          {items && items.map((item) => (
                <SingleItem key={item._id} item={item}  {...rest} />
          ))}
        </Grid>
      </Grid>
    </Grid>
    </Box>
  );
}
