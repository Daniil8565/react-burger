import {
  SEND_FORGOT_EMAIL_REQUEST,
  SEND_FORGOT_EMAIL_SUCCESS,
  SEND_FORGOT_EMAIL_FAILURE,
} from '../../types/ForgotPassword';

interface ForgotPasswordState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export const initialState: ForgotPasswordState = {
  isLoading: false,
  error: null,
  success: false,
};

export const forgotPasswordReducer = (
  state = initialState,
  action: any
): ForgotPasswordState => {
  switch (action.type) {
    case SEND_FORGOT_EMAIL_REQUEST:
      return { ...state, isLoading: true, error: null, success: false };
    case SEND_FORGOT_EMAIL_SUCCESS:
      return { ...state, isLoading: false, success: true };
    case SEND_FORGOT_EMAIL_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
