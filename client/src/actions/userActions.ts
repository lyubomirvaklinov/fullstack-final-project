import { Dispatch } from 'redux';
import {
  AppActions,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_REGISTER_CLEANUP,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_DELETE_FAILURE,
  USER_DELETE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_CLEANUP,
} from '../const/item-constants';
import axios from 'axios';
import {
  LoggingActions,
  LogOutActions,
  ReduxState,
  getStateType,
  IdType,
} from '../shared/shared-types';
import { UserListType } from '../shared/userType';

const listUsers = () => async (
  dispatch: Dispatch<AppActions>,
  getState: getStateType
) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const {
      userLogging: { userInfo },
    } = getState();
    if (userInfo) {
      const { data } = await axios.get('/api/users', {
        headers: { Authorization: 'Bearer ' + userInfo.token },
      });
      const result = data.filter((user: any) => {
        return user.isAdmin === false;
      }) as UserListType[];
      dispatch({ type: USER_LIST_SUCCESS, payload: result });
    }
  } catch (err) {
    dispatch({ type: USER_LIST_FAILURE, payload: err.message });
  }
};

const deleteUser = (userId: IdType) => async (
  dispatch: Dispatch<AppActions>,
  getState: getStateType
) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const {
      userLogging: { userInfo },
    } = getState();
    if (userInfo) {
      const {
        data: { data: newOrder },
      } = await axios.delete(`/api/users/delete/${userId}`, {
        headers: {
          Authorization: ' Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: USER_DELETE_SUCCESS, payload: newOrder });
    }
  } catch (error) {
    dispatch({ type: USER_DELETE_FAILURE, payload: error.message });
  }
};

const loggingAction = (email?: string, password?: string) => async (
  dispatch: Dispatch<AppActions>
) => {
  if (!email && !password) {
    dispatch({ type: USER_LOGOUT_REQUEST, payload: undefined });
    return;
  }
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post('/api/users/login', { email, password });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: USER_LOGIN_FAILURE, payload: err.message });
  }
};

const registerUser = (
  name?: string,
  email?: string,
  password?: string
) => async (dispatch: Dispatch<AppActions>) => {
  if (!name && !email && !password) {
    dispatch({ type: USER_REGISTER_CLEANUP, payload: undefined });
    return;
  }
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { name, email, password },
  });
  try {
    const { data } = await axios.post('/api/users/register', {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: USER_REGISTER_FAILURE, payload: err.message });
  }
};

const updateUser = (userToUpdate?: any) => async (
  dispatch: Dispatch<AppActions>,
  getState: getStateType
) => {
  try {
    if(!userToUpdate) {
      dispatch({type: USER_UPDATE_CLEANUP, payload: undefined})
      return;
    }
    dispatch({ type: USER_UPDATE_REQUEST, payload: userToUpdate });
    const {
      userLogging: { userInfo },
    } = getState();
    if (userInfo) {
      const { data } = await axios.put(
        `/api/users/edit-user/${userToUpdate.id}`,
        userToUpdate,
        {
          headers: { 'Authorization': 'Bearer ' + userInfo.token },
        }
      );
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    }
  } catch (err) {
    dispatch({ type: USER_UPDATE_FAILURE, payload: err.message });
  }
};

export { loggingAction, registerUser, listUsers, deleteUser, updateUser };
