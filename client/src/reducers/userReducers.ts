import { UserActionTypes, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE, USER_LOGOUT_REQUEST, USER_REGISTER_CLEANUP, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAILURE, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAILURE, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAILURE, USER_UPDATE_CLEANUP, USER_LOGOUT_SUCCESS } from '../const/item-constants';
import { LoggingActions } from '../model/userType';
import { UserListActions, RegisterAndUpdateActions } from '../model/userType';

const userState: UserListActions = { loading: true, userInfo: [], error: '' };

function usersListReducer(
  state = userState,
  action: UserActionTypes
): UserListActions {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, userInfo: [] };
    case USER_LIST_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LIST_FAILURE:
      return { loading: false, userInfo: [], error: action.payload };
    default:
      return state;
  }
}

function userDeleteReducer(
  state = userState,
  action: UserActionTypes
) {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_DELETE_FAILURE:
      return { loading: false, userInfo: [], error: action.payload };
    default:
      return state;
  }
}

const initialLogInState: LoggingActions = {isLoggedIn: false};

const userLoggingReducer = (state=initialLogInState, action:UserActionTypes ): LoggingActions => {
  switch(action.type){
    case USER_LOGIN_REQUEST:
      return { isLoggedIn: false};
    case USER_LOGIN_SUCCESS:
      return {isLoggedIn: true, userInfo: action.payload};
    case USER_LOGIN_FAILURE:
      return {isLoggedIn: false, error: action.payload};
      case USER_LOGOUT_REQUEST:
        return { isLoggedIn: false, userInfo: undefined, error: undefined};
      case USER_LOGOUT_SUCCESS:
        return { isLoggedIn: false, userInfo: undefined, error: undefined};
    default:
      return state;
  }
}


const initialRegisterState: RegisterAndUpdateActions = {loading: false};

const userRegisterReducer = (state=initialRegisterState, action:UserActionTypes ): RegisterAndUpdateActions => {
  switch(action.type){
    case USER_REGISTER_REQUEST:
      return { loading: true};
    case USER_REGISTER_SUCCESS:
      return {loading: false,success: true, userInfo: action.payload};
    case USER_REGISTER_FAILURE:
      return {loading: false, error: action.payload}
    case USER_REGISTER_CLEANUP:
      return {loading: false, userInfo: undefined}
    default:
      return state;
  }
}
const initialUpdateState: RegisterAndUpdateActions = {loading: false};

const userUpdateReducer = (state=initialUpdateState, action:UserActionTypes ): RegisterAndUpdateActions => {
  switch(action.type){
    case USER_UPDATE_REQUEST:
      return { loading: true};
    case USER_UPDATE_SUCCESS:
      return {loading: false, success: true, userInfo: action.payload};
    case USER_UPDATE_FAILURE:
      return {loading: false, error: action.payload}
    case USER_UPDATE_CLEANUP:
      return {loading: false, success: false, userInfo: action.payload}
    default:
      return state;
  }
}

export { userRegisterReducer, userLoggingReducer, usersListReducer, userDeleteReducer, userUpdateReducer}
