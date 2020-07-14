export interface UserActions {
  loading: boolean;
  userInfo?: LogInUserType;
  success?: boolean;
  error?: string;
}

export interface LoggingActions {
  isLoggedIn: boolean;
  userInfo?: LogInUserType;
  error?: string;
}
export interface LogOutActions {
  isLoggedOut: boolean;
  userInfo?: LogInUserType;
  error?: string;
}

export interface RegisterUserType {
  name: string;
  email: string;
  password: string;
}

export interface RegisterAndUpdateActions {
  loading: boolean;
  success?: boolean;
  userInfo?: UserListType;
  error?: string;
}

export interface LogInUserType {
  token: string;
  user: {
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    _id?: string;
  };
}
export interface LogInUserRequest {
  email?: string;
  password?: string;
}
export interface RegisterUserRequest {
  name?: string;
  email?: string;
  password?: string;
}
export interface UserListActions {
  loading: boolean;
  userInfo: UserListType[];
  error?: string;
  success?: boolean;
}

export interface UserListType {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

