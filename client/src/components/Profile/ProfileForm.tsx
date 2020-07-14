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
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Success from './Success';
import { string, object } from 'yup';
import { useLocation, useHistory } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';

import {
  ReduxState,
} from '../../shared/shared-types';
import { updateUser, loggingAction } from '../../actions/userActions';
import { LoggingActions, UserActions } from '../../model/userType';

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
  console.log(userUpdate);

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

  const handleEditToggle = () => {
    setEdit(!edit);
  };

  return !edit ? (
    <Box mt={10}>
      <Grid
        container
        direction="column"
        spacing={1}
        style={{ maxWidth: 400, margin: '0 auto' }}
      >
        {/* <Paper className={classes.control} style={{backgroundColor: "transparent"}}> */}
        <Typography variant="h4">
          <Box
            p={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontWeight="fontWeightBold"
          >
            Profile Information
          </Box>
          <Divider />
        </Typography>
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
        </Box>
        <Box mt={3} display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            style={{ marginTop: 'auto' }}
            onClick={handleEditToggle}
          >
            Edit
          </Button>
        </Box>
        {/* </Paper> */}
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
          <Box display="flex" justifyContent="center" marginTop="80px">
            <Form autoComplete="off">
              <Typography variant="h4">
                <Box
                  p={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontWeight="fontWeightBold"
                >
                  Edit Item
                </Box>
                <Divider />
              </Typography>
              <Box mt={4}>
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
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  m={3}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                  >
                    Edit
                  </Button>
                  <Button
                    type="submit"
                    className={classes.btn2}
                    onClick={handleEditToggle}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Form>
          </Box>
        )}
      </Formik>
    </>
  );
}
