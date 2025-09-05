import { AppDispatch } from '../../services/store';
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from '../../types/ResetPassword';
import { request } from '../../utils/request';

// thunk action для сброса пароля
export const resetPassword =
  (password: string, token: string) => async (dispatch: AppDispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    try {
      const data = await request('password-reset/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token }),
      });

      if (data.success) {
        dispatch({ type: RESET_PASSWORD_SUCCESS });
      } else {
        dispatch({ type: RESET_PASSWORD_FAILURE, payload: data.message });
      }
    } catch (error: unknown) {
      let errorMessage = 'Ошибка при сбросе пароля';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      dispatch({ type: RESET_PASSWORD_FAILURE, payload: errorMessage });
    }
  };
