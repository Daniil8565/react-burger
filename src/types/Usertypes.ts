export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export interface IUser {
  email: string;
  name: string;
}

interface FetchUserRequest {
  type: typeof FETCH_USER_REQUEST;
}
interface FetchUserSuccess {
  type: typeof FETCH_USER_SUCCESS;
  payload: IUser;
}
interface FetchUserFailure {
  type: typeof FETCH_USER_FAILURE;
  payload: string;
}

interface UpdateUserRequest {
  type: typeof UPDATE_USER_REQUEST;
}
interface UpdateUserSuccess {
  type: typeof UPDATE_USER_SUCCESS;
  payload: IUser;
}
interface UpdateUserFailure {
  type: typeof UPDATE_USER_FAILURE;
  payload: string;
}

export type UserActionTypes =
  | FetchUserRequest
  | FetchUserSuccess
  | FetchUserFailure
  | UpdateUserRequest
  | UpdateUserSuccess
  | UpdateUserFailure;
