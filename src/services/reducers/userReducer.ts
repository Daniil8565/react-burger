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

export interface UserState {
  user: IUser;
  isLoading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: { email: '', name: '' },
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FETCH_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload };

    case FETCH_USER_FAILURE:
    case UPDATE_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};
