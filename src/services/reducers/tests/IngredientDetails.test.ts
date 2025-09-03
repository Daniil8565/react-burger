import { IngredientDetailsReducer } from '../IngredientDetails';
import {
  SET_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
} from '../../../services/actions/IngredientDetails';
import { Idata } from '../../../types/BurgerIngrediend';
import { IngredientDetailsActions } from '../../../types/IngredientDetails';

describe('IngredientDetailsReducer', () => {
  const initialState = {
    selectedIngredient: null,
  };

  const sampleIngredient: Idata = {
    _id: '1',
    __v: 0,
    type: 'bun',
    proteins: 10,
    price: 50,
    name: 'Булка',
    image: 'bun.png',
    image_mobile: 'bun-mobile.png',
    image_large: 'bun-large.png',
    fat: 5,
    carbohydrates: 20,
    calories: 150,
  };

  it('возвращает начальное состояние', () => {
    expect(IngredientDetailsReducer(undefined, { type: '' } as any)).toEqual(
      initialState
    );
  });

  it('обрабатывает SET_INGREDIENT_DETAILS', () => {
    const action: IngredientDetailsActions = {
      type: SET_INGREDIENT_DETAILS,
      payload: sampleIngredient,
    };
    const state = IngredientDetailsReducer(initialState, action);
    expect(state).toEqual({
      selectedIngredient: sampleIngredient,
    });
  });

  it('обрабатывает CLEAR_INGREDIENT_DETAILS', () => {
    const action: IngredientDetailsActions = {
      type: CLEAR_INGREDIENT_DETAILS,
    };
    const state = IngredientDetailsReducer(
      { selectedIngredient: sampleIngredient },
      action
    );
    expect(state).toEqual({
      selectedIngredient: null,
    });
  });
});
