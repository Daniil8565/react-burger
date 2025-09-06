import { IConstructorIngredient } from '../../types/BurgerIngrediend';
import {
  UPDATE_TYPE,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from '../actions/BurgerConstructor';

type State = {
  bun: IConstructorIngredient | null;
  ingredients: IConstructorIngredient[];
};

type IAction =
  | { type: typeof UPDATE_TYPE; item: IConstructorIngredient }
  | { type: typeof DELETE_INGREDIENT; uuid: string }
  | { type: typeof MOVE_INGREDIENT; dragIndex: number; hoverIndex: number };

export const initialState: State = {
  bun: null,
  ingredients: [],
};

export const BurgerConstructorReducer = (
  state = initialState,
  action: IAction
): State => {
  switch (action.type) {
    case UPDATE_TYPE:
      if (action.item.type === 'bun') {
        return { ...state, bun: action.item };
      }
      return { ...state, ingredients: [...state.ingredients, action.item] };

    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((i) => i.uuid !== action.uuid),
      };

    case MOVE_INGREDIENT: {
      const newIngredients = [...state.ingredients];
      const [removed] = newIngredients.splice(action.dragIndex, 1);
      newIngredients.splice(action.hoverIndex, 0, removed);
      return { ...state, ingredients: newIngredients };
    }

    default:
      return state;
  }
};
