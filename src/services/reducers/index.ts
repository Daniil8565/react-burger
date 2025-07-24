import { combineReducers } from 'redux';
import { BurgerIngredientsReducers } from './BurgerIngredients';
import { BurgerConstructorReducer } from './BurgerConstructor';
import { IngredientDetailsReducer } from './IngredientDetails';
import { orderReducer } from './OrderDetails';
import { authReducer } from './authReducers';
import { userReducer } from './userReducer';
import { resetPasswordReducer } from './ResetPassword';
import { forgotPasswordReducer } from './ForgotPassword';

export const rootReducer = combineReducers({
  BurgerIngredientsReducers,
  BurgerConstructorReducer,
  IngredientDetailsReducer,
  orderReducer,
  authReducer,
  userReducer,
  resetPasswordReducer,
  forgotPasswordReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
