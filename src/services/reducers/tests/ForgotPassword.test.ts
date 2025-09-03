import { forgotPasswordReducer } from '../ForgotPassword';
import {
  SEND_FORGOT_EMAIL_REQUEST,
  SEND_FORGOT_EMAIL_SUCCESS,
  SEND_FORGOT_EMAIL_FAILURE,
} from '../../../types/ForgotPassword';

interface ForgotPasswordState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

describe('forgotPasswordReducer', () => {
  const initialState: ForgotPasswordState = {
    isLoading: false,
    error: null,
    success: false,
  };

  it('возвращает начальное состояние', () => {
    expect(forgotPasswordReducer(undefined, { type: '' } as any)).toEqual(
      initialState
    );
  });

  it('обрабатывает SEND_FORGOT_EMAIL_REQUEST', () => {
    const action = { type: SEND_FORGOT_EMAIL_REQUEST };
    const state = forgotPasswordReducer(initialState, action);
    expect(state).toEqual({
      isLoading: true,
      error: null,
      success: false,
    });
  });

  it('обрабатывает SEND_FORGOT_EMAIL_SUCCESS', () => {
    const action = { type: SEND_FORGOT_EMAIL_SUCCESS };
    const state = forgotPasswordReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      isLoading: false,
      error: null,
      success: true,
    });
  });

  it('обрабатывает SEND_FORGOT_EMAIL_FAILURE', () => {
    const errorMessage = 'Ошибка отправки';
    const action = { type: SEND_FORGOT_EMAIL_FAILURE, payload: errorMessage };
    const state = forgotPasswordReducer(
      { ...initialState, isLoading: true },
      action
    );
    expect(state).toEqual({
      isLoading: false,
      error: errorMessage,
      success: false,
    });
  });
});
