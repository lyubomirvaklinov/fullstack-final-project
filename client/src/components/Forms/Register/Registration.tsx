import React, { ReactElement, useState, useEffect } from 'react';
import { Button, Box, SnackbarContent } from '@material-ui/core';
import useStyles from '../styles';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loggingAction } from '../../../actions/userActions';
import { UserActions, ReduxState } from '../../../shared/shared-types';
import { string, object } from 'yup';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { TextField } from 'formik-material-ui';


interface Props {}

interface RegUserVals {
  name: string;
  email: string;
  password: string;
}

export default function Registration({}: Props): ReactElement {
  const classes = useStyles();
  const [regVals, setRegVals] = useState<RegUserVals>({
    name: '',
    email: '',
    password: '',
  });
  const userRegister: UserActions = useSelector(
    (state: ReduxState) => state.userRegister
  );
  const { userInfo, success, error } = userRegister;

  // console.log(userInfo);

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
  }, [userInfo]);

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
              {/* <TextField
                className={classes.root}
                placeholder="Enter Username"
                autoFocus
                name="name"
                value={values.name}
                onChange={handleChange}
              /> */}
              <Field
                fullWidth
                name="name"
                component={TextField}
                label="First Name"
                onChange={handleChange}
              />
            </div>
            <div>
              {/* <TextField
                className={classes.root}
                placeholder="Enter Email"
                name="email"
                value={values.email}
                onChange={handleChange}
              /> */}
              <Field
                fullWidth
                name="email"
                component={TextField}
                label="E-mail"
                onChange={handleChange}
              />
            </div>
            <div>
              {/* <TextField
                className={classes.root}
                placeholder="Enter Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              /> */}
              <Field
                fullWidth
                name="password"
                type="password"
                component={TextField}
                label="Password"
                onChange={handleChange}
              />
            </div>
            {/* <div>
              <TextField
                className={classes.root}
                placeholder="Verify Password"
                type="password"
                name="verifyPassword"
                value={values.verifyPassword}
                onChange={handleChange}
              />
            </div> */}
            <Box display="flex" justifyContent="center" margin="25px">
              <Button className="btn" type="submit">
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
