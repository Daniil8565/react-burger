import { userReducer } from '../userReducer';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  IUser,
  UserActionTypes,
} from '../../../types/Usertypes';

describe('userReducer', () => {
  const initialState = {
    user: { email: '', name: '' },
    isLoading: false,
    error: null,
  };

  const sampleUser: IUser = { email: 'test@example.com', name: 'Test User' };

  it('возвращает начальное состояние', () => {
    expect(userReducer(undefined, { type: '' } as any)).toEqual(initialState);
  });

  it('обрабатывает FETCH_USER_REQUEST', () => {
    const action: UserActionTypes = { type: FETCH_USER_REQUEST };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  it('обрабатывает FETCH_USER_SUCCESS', () => {
    const action: UserActionTypes = {
      type: FETCH_USER_SUCCESS,
      payload: sampleUser,
    };
    const state = userReducer({ ...initialState, isLoading: true }, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: sampleUser,
    });
  });

  it('обрабатывает FETCH_USER_FAILURE', () => {
    const action: UserActionTypes = {
      type: FETCH_USER_FAILURE,
      payload: 'Ошибка',
    };
    const state = userReducer({ ...initialState, isLoading: true }, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка',
    });
  });

  it('обрабатывает UPDATE_USER_REQUEST', () => {
    const action: UserActionTypes = { type: UPDATE_USER_REQUEST };
    const state = userReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  it('обрабатывает UPDATE_USER_SUCCESS', () => {
    const action: UserActionTypes = {
      type: UPDATE_USER_SUCCESS,
      payload: sampleUser,
    };
    const state = userReducer({ ...initialState, isLoading: true }, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: sampleUser,
    });
  });

  it('обрабатывает UPDATE_USER_FAILURE', () => {
    const action: UserActionTypes = {
      type: UPDATE_USER_FAILURE,
      payload: 'Ошибка',
    };
    const state = userReducer({ ...initialState, isLoading: true }, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка',
    });
  });
});
