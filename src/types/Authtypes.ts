export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

export interface User {
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
}
interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: { user: User; accessToken: string };
}
interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  payload: string;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}
interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { user: User; accessToken: string };
}
interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

interface LogoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}
interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}
interface LogoutFailureAction {
  type: typeof LOGOUT_FAILURE;
  payload: string;
}

interface RefreshTokenRequestAction {
  type: typeof REFRESH_TOKEN_REQUEST;
}
interface RefreshTokenSuccessAction {
  type: typeof REFRESH_TOKEN_SUCCESS;
  payload: string;
}
interface RefreshTokenFailureAction {
  type: typeof REFRESH_TOKEN_FAILURE;
  payload: string;
}

export type AuthActionTypes =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction
  | RefreshTokenRequestAction
  | RefreshTokenSuccessAction
  | RefreshTokenFailureAction;
