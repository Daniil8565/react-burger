import {
  SEND_FORGOT_EMAIL_REQUEST,
  SEND_FORGOT_EMAIL_SUCCESS,
  SEND_FORGOT_EMAIL_FAILURE,
} from '../../types/ForgotPassword';

export const sendForgotEmail = (email: string) => async (dispatch: any) => {
  dispatch({ type: SEND_FORGOT_EMAIL_REQUEST });

  try {
    const response = await fetch(
      'https://norma.nomoreparties.space/api/password-reset',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    console.log(data);
    if (data.success) {
      console.log('Успех');
      dispatch({ type: SEND_FORGOT_EMAIL_SUCCESS });
    } else {
      dispatch({
        type: SEND_FORGOT_EMAIL_FAILURE,
        payload: data.message || 'Ошибка',
      });
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Неизвестная ошибка';
    dispatch({ type: SEND_FORGOT_EMAIL_FAILURE, payload: message });
  }
};
