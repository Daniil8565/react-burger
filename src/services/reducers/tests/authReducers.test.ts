// authReducer.test.ts
import { authReducer, initialState } from '../authReducers';
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
} from '../../../types/Authtypes';
import { AuthState } from '../../../types/Authtypes';

describe('authReducer', () => {
  it('должен возвращать начальное состояние', () => {
    expect(authReducer(undefined, { type: '' } as any)).toEqual(initialState);
  });

  it('обрабатывает REGISTER_REQUEST', () => {
    expect(
      authReducer(initialState, { type: REGISTER_REQUEST } as any)
    ).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  it('обрабатывает LOGIN_SUCCESS', () => {
    const action = {
      type: LOGIN_SUCCESS,
      payload: {
        user: { email: 'test@test.com', name: 'Test User' },
        accessToken: '123',
      },
    };
    expect(authReducer(initialState, action as any)).toEqual({
      ...initialState,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
      isLoading: false,
      isAuthenticated: true,
      error: null,
      isAuthChecked: true,
    });
  });

  it('обрабатывает LOGOUT_SUCCESS', () => {
    const state: AuthState = {
      ...initialState,
      user: { email: 'test@test.com', name: 'Test User' },
      accessToken: '123',
      isAuthenticated: true,
    };
    expect(authReducer(state, { type: LOGOUT_SUCCESS } as any)).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  it('обрабатывает REFRESH_TOKEN_SUCCESS', () => {
    const action = { type: REFRESH_TOKEN_SUCCESS, payload: 'newToken' };
    expect(authReducer(initialState, action as any)).toEqual({
      ...initialState,
      accessToken: 'newToken',
      isAuthenticated: true,
      isLoading: false,
      error: null,
      isAuthChecked: true,
    });
  });

  it('обрабатывает REGISTER_FAILURE', () => {
    const action = { type: REGISTER_FAILURE, payload: 'Ошибка регистрации' };
    expect(authReducer(initialState, action as any)).toEqual({
      ...initialState,
      isLoading: false,
      isAuthenticated: false,
      error: 'Ошибка регистрации',
      isAuthChecked: true,
    });
  });
});
