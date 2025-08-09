import { RootState } from '../services/reducers/index';

export const getAccessTokenFromState = (state: RootState): string | null => {
  const token = state.authReducer.accessToken;
  return token ? token : null;
};
