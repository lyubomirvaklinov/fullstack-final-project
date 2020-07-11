import React, { ReactElement, useState, useEffect } from 'react';
import { Button, Box, SnackbarContent } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loggingAction } from '../../../actions/userActions';
import {
  ReduxState,
  UserActions,
  LoggingActions,
} from '../../../shared/shared-types';
import { Formik, Field, Form } from 'formik';
import { string, object } from 'yup';

interface Props {}

export default function Login({}: Props): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const location = useLocation();

  const userLogging: LoggingActions = useSelector(
    (state: ReduxState) => state.userLogging
  );
  const { userInfo, error, isLoggedIn } = userLogging;
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/items';

  const handleClick = () => {
    dispatch(loggingAction());
    window.location.reload(false);
  };

  const action = (
    <Button color="secondary" size="small" onClick={handleClick}>
      Try Again!
    </Button>
  );

  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [userInfo]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={object({
        email: string().email().required(),
        password: string().required(),
      })}
      onSubmit={({ email, password }) => {
        dispatch(loggingAction(email, password));
      }}
    >
      {({ values, handleChange }) => (
        <Box display="flex" justifyContent="center" margin="100px">
          <Form autoComplete="off">
            <Box display="flex" justifyContent="center" alignItems="center">
              <h1>Log In</h1>
            </Box>
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
              <Button className="btn" type="submit">
                Log In
              </Button>
            </Box>
            <p>
              Don't have an account yet?{' '}
              <Link
                to={
                  redirect === '/items'
                    ? 'register'
                    : `register?redirect=${redirect}`
                }
                style={{ color: '#3686ad' }}
              >
                Register here
              </Link>
              .
            </p>
            {error &&  <SnackbarContent message="Invalid Credentials!" action={action} />}
          </Form>
        </Box>
      )}
    </Formik>
  );
}
