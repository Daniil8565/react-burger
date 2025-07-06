import {
  UPDATE_TYPE,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from '../actions/BurgerConstructor';
import { IAction } from '../../types/BurgerConstructor';
import { Idata } from '../../types/BurgerIngrediend';

type State = {
  bun: Idata | null;
  ingredients: Idata[];
};

const initialState: State = {
  bun: null,
  ingredients: [],
};

export const BurgerConstructorReducer = (
  state = initialState,
  action: IAction
) => {
  switch (action.type) {
    case UPDATE_TYPE:
      if (action.item.type === 'bun') {
        return {
          ...state,
          bun: action.item,
        };
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.item],
      };

    case DELETE_INGREDIENT:
      console.log('delete');
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (_, index) => index !== action.index
        ),
      };

    case MOVE_INGREDIENT: {
      const updatedIngredients = [...state.ingredients];
      const [removed] = updatedIngredients.splice(action.dragIndex, 1);
      updatedIngredients.splice(action.hoverIndex, 0, removed);
      return {
        ...state,
        ingredients: updatedIngredients,
      };
    }

    default:
      return state;
  }
};
