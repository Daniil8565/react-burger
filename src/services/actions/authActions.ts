import { Dispatch } from 'redux';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  AuthActionTypes,
} from '../../types/Authtypes';
import { request } from '../../utils/request';

const saveRefreshToken = (token: string) =>
  localStorage.setItem('refreshToken', token);

const removeRefreshToken = () => localStorage.removeItem('refreshToken');

const getRefreshToken = (): string | null =>
  localStorage.getItem('refreshToken');

export const registerUser = (email: string, password: string, name: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
      const data = await request('auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      console.log('data registerUser', data);
      saveRefreshToken(data.refreshToken);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: { user: data.user, accessToken: data.accessToken },
      });
    } catch (error: any) {
      console.log('data REGISTER_FAILURE', error);
      dispatch({ type: REGISTER_FAILURE, payload: error.toString() });
    }
  };
};

export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const data = await request('auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      saveRefreshToken(data.refreshToken);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.user, accessToken: data.accessToken },
      });
    } catch (error: any) {
      dispatch({ type: LOGIN_FAILURE, payload: error.toString() });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: LOGOUT_REQUEST });

    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) throw new Error('No refresh token found');

      await request('auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
      });

      removeRefreshToken();
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error: any) {
      dispatch({ type: LOGOUT_FAILURE, payload: error.toString() });
    }
  };
};

export const refreshAccessToken = () => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: REFRESH_TOKEN_REQUEST });

    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) throw new Error('No refresh token found');

      const data = await request('auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
      });

      saveRefreshToken(data.refreshToken);

      dispatch({ type: REFRESH_TOKEN_SUCCESS, payload: data.accessToken });
    } catch (error: any) {
      dispatch({ type: REFRESH_TOKEN_FAILURE, payload: error.toString() });
    }
  };
};
