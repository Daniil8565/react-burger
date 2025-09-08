import {
  resetPasswordReducer,
  initialState,
  ResetPasswordState,
} from '../ResetPassword';
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from '../../../types/ResetPassword';
import { ResetPasswordActionTypes } from '../../../types/ResetPassword';

describe('resetPasswordReducer', () => {
  it('возвращает начальное состояние', () => {
    expect(resetPasswordReducer(undefined, { type: '' } as any)).toEqual(
      initialState
    );
  });

  it('обрабатывает RESET_PASSWORD_REQUEST', () => {
    const action: ResetPasswordActionTypes = { type: RESET_PASSWORD_REQUEST };
    const state = resetPasswordReducer(initialState, action);
    expect(state).toEqual({
      isLoading: true,
      error: null,
      success: false,
    });
  });

  it('обрабатывает RESET_PASSWORD_SUCCESS', () => {
    const action: ResetPasswordActionTypes = { type: RESET_PASSWORD_SUCCESS };
    const state = resetPasswordReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      isLoading: false,
      error: null,
      success: true,
    });
  });

  it('обрабатывает RESET_PASSWORD_FAILURE', () => {
    const action: ResetPasswordActionTypes = {
      type: RESET_PASSWORD_FAILURE,
      payload: 'Ошибка восстановления',
    };
    const state = resetPasswordReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      isLoading: false,
      error: 'Ошибка восстановления',
      success: false,
    });
  });
});
