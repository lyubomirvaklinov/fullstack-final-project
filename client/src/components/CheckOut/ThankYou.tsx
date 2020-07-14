import React, { ReactElement, useState, useEffect } from 'react';
import { Grid, Paper, Box, Button } from '@material-ui/core';
import useStyles from '../Profile/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeAllCartItems } from '../../actions/cartActions';

interface Props {}

export default function ThankYou({}: Props): ReactElement {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeAllCartItems());
    localStorage.removeItem('order-details');
    if (redirect) history.push('/items');
  }, [redirect]);

  const handleRedirect = () => {
    setRedirect(true);
  };
  return (
    <Grid
      container
      direction="column"
      style={{ maxWidth: 200, margin: '0 auto' }}
    >
      <Box mt={30} display="flex" justifyContent=" center" alignItems="center">
        <Paper className={classes.control}>
          <h1>Thank You!</h1>
          <Box mt={3} display="flex" justifyContent="center">
            <Button
            variant="contained"
              color="primary"
              className={classes.btn}
              onClick={handleRedirect}
            >
              Back To Store
            </Button>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}
