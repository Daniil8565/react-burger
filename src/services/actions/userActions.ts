import { request } from '../../utils/request';
import { getAccessTokenFromState } from '../../utils/getAccessTokenFromState';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UserActionTypes,
  IUser,
} from '../../types/Usertypes';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';

export const fetchUser = () => {
  return async (
    dispatch: Dispatch<UserActionTypes>,
    getState: () => RootState
  ) => {
    dispatch({ type: FETCH_USER_REQUEST });
    console.log('fetchUser');
    try {
      const accessToken = getAccessTokenFromState(getState());
      const data = await request('auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: accessToken || '',
        },
      });
      console.log('Данные о пользователе', data);

      dispatch({ type: FETCH_USER_SUCCESS, payload: data.user });
    } catch (error: any) {
      dispatch({ type: FETCH_USER_FAILURE, payload: error.toString() });
    }
  };
};

export const updateUser = (name: string, email: string, password?: string) => {
  return async (
    dispatch: Dispatch<UserActionTypes>,
    getState: () => RootState
  ) => {
    dispatch({ type: UPDATE_USER_REQUEST });

    try {
      const accessToken = getAccessTokenFromState(getState());
      const body: Partial<IUser & { password: string }> = { name, email };
      if (password) body.password = password;

      const data = await request('auth/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken || '',
        },
        body: JSON.stringify(body),
      });

      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
    } catch (error: any) {
      dispatch({ type: UPDATE_USER_FAILURE, payload: error.toString() });
    }
  };
};
