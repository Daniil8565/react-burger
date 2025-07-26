import { combineReducers } from 'redux';
import { BurgerIngredientsReducers } from './BurgerIngredients';
import { BurgerConstructorReducer } from './BurgerConstructor';
import { IngredientDetailsReducer } from './IngredientDetails';
import { orderReducer } from './OrderDetails';

export const rootReducer = combineReducers({
  BurgerIngredientsReducers,
  BurgerConstructorReducer,
  IngredientDetailsReducer,
  orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
