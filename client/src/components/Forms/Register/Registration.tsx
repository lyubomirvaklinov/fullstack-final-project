import React, { ReactElement, useState, useEffect } from 'react';
import { Button, Box, SnackbarContent } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loggingAction } from '../../../actions/userActions';
import { ReduxState } from '../../../shared/shared-types';
import { string, object } from 'yup';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { RegisterAndUpdateActions } from '../../../model/userType';
import useStyles from '../../Profile/styles';

interface Props {}

interface RegUserVals {
  name: string;
  email: string;
  password: string;
}

export default function Registration({}: Props): ReactElement {
  const [regVals, setRegVals] = useState<RegUserVals>({
    name: '',
    email: '',
    password: '',
  });
  const userRegister: RegisterAndUpdateActions = useSelector(
    (state: ReduxState) => state.userRegister
  );
  const { userInfo, success, error } = userRegister;
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/items';
  const dispatch = useDispatch();

  const handleClick = () => {
    window.location.reload(false);
  };

  const action = (
    <Button color="secondary" size="small" onClick={handleClick}>
      Try Again!
    </Button>
  );

  useEffect(() => {
    if (success) dispatch(loggingAction(regVals.email, regVals.password));
    if (userInfo) history.push(redirect);
    dispatch(registerUser());
  }, [userInfo, dispatch, history]);

  return (
    <Formik
      initialValues={regVals}
      validationSchema={object({
        name: string().required(),
        email: string().email().required(),
        password: string()
          .required()
          .min(5, 'Password must be at least 5 characters!'),
      })}
      onSubmit={({ name, email, password }) => {
        setRegVals({ name, email, password });
        dispatch(registerUser(name, email, password));
      }}
    >
      {({ values, handleChange }) => (
        <Box display="flex" justifyContent="center" margin="100px">
          <Form autoComplete="off">
            <Box display="flex" justifyContent="center" alignItems="center">
              <h1>Register</h1>
            </Box>
            <div>
              <Field
                fullWidth
                name="name"
                component={TextField}
                label="First Name"
                onChange={handleChange}
              />
            </div>
            <div>
              <Field
                fullWidth
                name="email"
                component={TextField}
                label="E-mail"
                onChange={handleChange}
              />
            </div>
            <div>
              <Field
                fullWidth
                name="password"
                type="password"
                component={TextField}
                label="Password"
                onChange={handleChange}
              />
            </div>
            <Box display="flex" justifyContent="center" margin="25px">
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                type="submit"
              >
                Sign Up
              </Button>
            </Box>
            <p>
              Already got an account?{' '}
              <Link
                to={
                  redirect === '/items' ? 'login' : `login?redirect=${redirect}`
                }
                style={{ color: '#3686ad' }}
              >
                Log In here
              </Link>
              .
            </p>
            {error && (
              <SnackbarContent
                message="E-mail already taken!"
                action={action}
              />
            )}
          </Form>
        </Box>
      )}
    </Formik>
  );
}
