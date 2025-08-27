import * as BurgerIngrediend from './BurgerIngredients';
import * as OrderDetails from './OrderDetails';
import * as authActions from './authActions';
import * as userActions from './userActions';
import * as resetPassword from './ResetPassword';
import * as forgotPassword from './ForgotPassword';

export default {
  ...BurgerIngrediend,
  ...OrderDetails,
  ...authActions,
  ...userActions,
  ...resetPassword,
  ...forgotPassword,
};
