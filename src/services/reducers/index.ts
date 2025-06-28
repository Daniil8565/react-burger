import { combineReducers } from 'redux';
import { BurgerIngredientsReducers } from './BurgerIngredients';
import { BurgerConstructorReducer } from './BurgerConstructor';
import { IngredientDetailsReducer } from './IngredientDetails';

export const rootReducer = combineReducers({
  BurgerIngredientsReducers,
  BurgerConstructorReducer,
  IngredientDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
