import { IdType } from '../../../client/src/shared/shared-types';
export interface UserType {
  name: string,
  email: string,
  password: string,
  isAdmin: boolean
}

export interface VerifyToken {
  id: IdType,
  iat: number
}
export interface VerifyToken {
  id: IdType;
  iat: number;
  exp: number;
}