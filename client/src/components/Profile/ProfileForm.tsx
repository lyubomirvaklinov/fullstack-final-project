import React, { ReactElement, useState, useEffect } from 'react';
import {
  Button,
  Box,
  Grid,
  Typography,
  Divider,
  Paper,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import useStyles from './styles';
import { Formik, Form, Field, FormikValues } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Success from './Success';
import { string, object } from 'yup';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import {
  ReduxState,
  UserActions,
  LoggingActions,
} from '../../shared/shared-types';
import { updateUser, loggingAction } from '../../actions/userActions';

interface Props {}

interface UpdateUserVals {
  id?: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
}

export default function ProfileForm({}: Props): ReactElement {
  const classes = useStyles();
  const userLoggedIn: LoggingActions = useSelector(
    (state: ReduxState) => state.userLogging
  );
  const userUpdate: UserActions = useSelector(
    (state: ReduxState) => state.userUpdate
  );
console.log(userUpdate)
  const { success } = userUpdate;
  const { userInfo } = userLoggedIn;

  const [edit, setEdit] = useState(false);
  const initialValues: UpdateUserVals = {
    id: userInfo?.user._id,
    name: userInfo?.user.name,
    email: userInfo?.user.email,
    isAdmin: userInfo?.user.isAdmin,
  };

  const history = useHistory();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/items';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUser());
  }, []);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  return !edit ? (
    <Box mt={10}>
      <Grid
        container
        direction="column"
        spacing={1}
        style={{ maxWidth: 400, margin: '0 auto' }}
      >
        <Paper className={classes.control}>
          <Box
            paddingBottom={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5">Profile Information</Typography>
          </Box>
          <Divider />
          <Box mt={5}>
            <Box paddingBottom={2} display="flex">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  userInfo?.user.isAdmin
                    ? `${userInfo?.user.name} - Administrator`
                    : userInfo?.user.name
                }
              />
            </Box>
            <Box
              paddingBottom={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary={userInfo?.user.email} />
            </Box>
            <Box
              paddingBottom={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Address" />
            </Box>{' '}
          </Box>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 'auto' }}
          onClick={handleEdit}
        >
          Edit
        </Button>
      </Grid>
    </Box>
  ) : success ? (
    <Success />
  ) : (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          name: string().required(),
          email: string().email().required(),
        })}
        onSubmit={(values) => {
          dispatch(updateUser(values));
        }}
      >
        {({ values, handleChange }) => (
          <Box display="flex" justifyContent="center" marginTop="100px">
            <Form autoComplete="off">
              <Box
                mb={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <h1>Edit Profile</h1>
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
                  style={{ width: 250 }}
                  name="email"
                  component={TextField}
                  label="E-mail"
                  onChange={handleChange}
                />
              </div>
              <Box display="flex" justifyContent="center" marginTop="25px">
                <Button className="btn" type="submit">
                  Edit
                </Button>
                <Button className="btn" type="submit" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            </Form>
          </Box>
        )}
      </Formik>
    </>
  );
}
