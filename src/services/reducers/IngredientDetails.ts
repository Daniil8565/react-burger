import {
  SET_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
} from '../actions/IngredientDetails';
import { IngredientDetailsActions } from '../../types/IngredientDetails';
import { Idata } from '../../types/BurgerIngrediend';

interface IngredientDetailsState {
  selectedIngredient: Idata | null;
}

const initialState: IngredientDetailsState = {
  selectedIngredient: null,
};

export const IngredientDetailsReducer = (
  state = initialState,
  action: IngredientDetailsActions
): IngredientDetailsState => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS:
      return { ...state, selectedIngredient: action.payload };
    case CLEAR_INGREDIENT_DETAILS:
      return { ...state, selectedIngredient: null };
    default:
      return state;
  }
};
