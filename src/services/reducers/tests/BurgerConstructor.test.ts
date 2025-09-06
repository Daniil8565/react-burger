import { BurgerConstructorReducer, initialState } from '../BurgerConstructor';
import {
  UPDATE_TYPE,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from '../../actions/BurgerConstructor';
import { IConstructorIngredient } from '../../../types/BurgerIngrediend';

const bun: IConstructorIngredient = {
  uuid: 'bun-1',
  _id: '111',
  __v: 0,
  type: 'bun',
  proteins: 0,
  price: 50,
  name: 'Булка',
  image: 'bun.png',
  image_mobile: 'bun-mobile.png',
  image_large: 'bun-large.png',
  fat: 0,
  carbohydrates: 0,
  calories: 0,
};

const ingredient1: IConstructorIngredient = {
  uuid: 'ing-1',
  _id: '222',
  __v: 0,
  type: 'sauce',
  proteins: 0,
  price: 10,
  name: 'Соус',
  image: 'sauce.png',
  image_mobile: 'sauce-mobile.png',
  image_large: 'sauce-large.png',
  fat: 0,
  carbohydrates: 0,
  calories: 0,
};

const ingredient2: IConstructorIngredient = {
  uuid: 'ing-2',
  _id: '333',
  __v: 0,
  type: 'main',
  proteins: 0,
  price: 20,
  name: 'Начинка',
  image: 'main.png',
  image_mobile: 'main-mobile.png',
  image_large: 'main-large.png',
  fat: 0,
  carbohydrates: 0,
  calories: 0,
};

describe('BurgerConstructorReducer', () => {
  it('возвращает начальное состояние', () => {
    expect(BurgerConstructorReducer(undefined, { type: '' } as any)).toEqual(
      initialState
    );
  });

  it('обрабатывает UPDATE_TYPE с булкой', () => {
    const action: { type: typeof UPDATE_TYPE; item: IConstructorIngredient } = {
      type: UPDATE_TYPE,
      item: bun,
    };
    const state = BurgerConstructorReducer(initialState, action);
    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toEqual([]);
  });

  it('обрабатывает UPDATE_TYPE с ингредиентом (не булкой)', () => {
    const action: { type: typeof UPDATE_TYPE; item: IConstructorIngredient } = {
      type: UPDATE_TYPE,
      item: ingredient1,
    };
    const state = BurgerConstructorReducer(initialState, action);
    expect(state.ingredients).toEqual([ingredient1]);
    expect(state.bun).toBeNull();
  });

  it('обрабатывает DELETE_INGREDIENT', () => {
    const startState = {
      ...initialState,
      ingredients: [ingredient1, ingredient2],
    };
    const action: { type: typeof DELETE_INGREDIENT; uuid: string } = {
      type: DELETE_INGREDIENT,
      uuid: 'ing-1',
    };
    const state = BurgerConstructorReducer(startState, action);
    expect(state.ingredients).toEqual([ingredient2]);
  });

  it('обрабатывает MOVE_INGREDIENT (перемещение ингредиентов)', () => {
    const startState = {
      ...initialState,
      ingredients: [ingredient1, ingredient2],
    };
    const action: {
      type: typeof MOVE_INGREDIENT;
      dragIndex: number;
      hoverIndex: number;
    } = {
      type: MOVE_INGREDIENT,
      dragIndex: 0,
      hoverIndex: 1,
    };
    const state = BurgerConstructorReducer(startState, action);
    expect(state.ingredients).toEqual([ingredient2, ingredient1]);
  });
});
