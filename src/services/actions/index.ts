import * as BurgerIngrediend from './BurgerIngredients';
import * as OrderDetails from './OrderDetails';
import * as authActions from './authActions';
import * as userActions from './userActions';

export default {
  ...BurgerIngrediend,
  ...OrderDetails,
  ...authActions,
  ...userActions,
};
