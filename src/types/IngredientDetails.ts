import {
  SET_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
} from '../services/actions/IngredientDetails';
import { Idata } from './BurgerIngrediend';

interface SetIngredientDetailsAction {
  type: typeof SET_INGREDIENT_DETAILS;
  payload: Idata;
}

interface ClearIngredientDetailsAction {
  type: typeof CLEAR_INGREDIENT_DETAILS;
}

export type IngredientDetailsActions =
  | SetIngredientDetailsAction
  | ClearIngredientDetailsAction;

export const setIngredientDetails = (
  item: Idata
): SetIngredientDetailsAction => ({
  type: SET_INGREDIENT_DETAILS,
  payload: item,
});

export const clearIngredientDetails = (): ClearIngredientDetailsAction => ({
  type: CLEAR_INGREDIENT_DETAILS,
});
