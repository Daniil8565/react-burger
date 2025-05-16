import { combineReducers } from 'redux';
import { BurgerIngredientsReducers } from './BurgerIngredients';

export const rootReducer = combineReducers({
  BurgerIngredientsReducers,
});

export type RootState = ReturnType<typeof rootReducer>;
