import { UPDATE_TYPE } from '../actions/BurgerConstructor';
import { IAction } from '../../types/BurgerConstructor';
import { Idata } from '../../types/BurgerIngrediend';

type State = {
  ingredients: Idata[];
};

const initialState: State = {
  ingredients: [],
};

export const BurgerConstructorReducer = (
  state = initialState,
  action: IAction
) => {
  switch (action.type) {
    case UPDATE_TYPE:
      return {
        ...state,
        ingredients: [...state.ingredients, { ...action.item }],
      };
    default:
      return state;
  }
};
