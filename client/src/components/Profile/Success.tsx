import React, { ReactElement, useState, useEffect } from 'react';
import { Grid, Paper, Box, Button } from '@material-ui/core';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeAllCartItems } from '../../actions/cartActions';
import CheckOut from '../CheckOut/CheckOut';

interface Props {}

export default function ThankYou({}: Props): ReactElement {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeAllCartItems());
    if(redirect) history.push('/items');
  }, [redirect])

  const handleRedirect = () => {
    setRedirect(true);
    localStorage.removeItem("order-details");
  }
  return (

      <Box mt={30} display="flex" justifyContent=" center" alignItems="center">
        <Paper className={classes.control} style={{backgroundColor: 'transparent'}}>
          <h1>Please Log In Again To Save The Changes!</h1>
        </Paper>
      </Box>


  );
}
