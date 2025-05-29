import { combineReducers } from 'redux';
import { BurgerIngredientsReducers } from './BurgerIngredients';
import { BurgerConstructorReducer } from './BurgerConstructor';

export const rootReducer = combineReducers({
  BurgerIngredientsReducers,
  BurgerConstructorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
