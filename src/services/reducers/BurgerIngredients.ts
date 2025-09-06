import { BurgerActionTypes, BurgerAction } from '../../types/BurgerIngrediend';
import { IinitialStateBurgerIngredients } from '../../types/BurgerIngrediend';

export const initialState: IinitialStateBurgerIngredients = {
  data: [],
  loading: true,
  error: false,
};

export const BurgerIngredientsReducers = (
  state = initialState,
  action: BurgerAction
): IinitialStateBurgerIngredients => {
  switch (action.type) {
    case BurgerActionTypes.LOADING:
      return { ...state, loading: true, error: false };
    case BurgerActionTypes.SUCCESS:
      return { ...state, data: action.payload, loading: false, error: false };
    case BurgerActionTypes.FAILED:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
