export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

interface ResetPasswordRequestAction {
  type: typeof RESET_PASSWORD_REQUEST;
}

interface ResetPasswordSuccessAction {
  type: typeof RESET_PASSWORD_SUCCESS;
}

interface ResetPasswordFailureAction {
  type: typeof RESET_PASSWORD_FAILURE;
  payload: string;
}

export type ResetPasswordActionTypes =
  | ResetPasswordRequestAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailureAction;
