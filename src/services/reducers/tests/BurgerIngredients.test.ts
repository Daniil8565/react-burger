import { BurgerIngredientsReducers } from '../BurgerIngredients';
import {
  BurgerActionTypes,
  Idata,
  BurgerAction,
} from '../../../types/BurgerIngrediend';
import { IinitialStateBurgerIngredients } from '../../../types/BurgerIngrediend';

const sampleData: Idata[] = [
  {
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
  },
  {
    _id: '2',
    __v: 0,
    type: 'sauce',
    proteins: 5,
    price: 20,
    name: 'Соус',
    image: 'sauce.png',
    image_mobile: 'sauce-mobile.png',
    image_large: 'sauce-large.png',
    fat: 2,
    carbohydrates: 10,
    calories: 50,
  },
];

describe('BurgerIngredientsReducers', () => {
  it('возвращает начальное состояние', () => {
    expect(BurgerIngredientsReducers(undefined, { type: '' } as any)).toEqual({
      data: [],
      loading: true,
      error: false,
    });
  });

  it('обрабатывает LOADING', () => {
    const action: BurgerAction = { type: BurgerActionTypes.LOADING };
    const state = BurgerIngredientsReducers(
      { data: null, loading: false, error: true },
      action
    );
    expect(state).toEqual({ data: null, loading: true, error: false });
  });

  it('обрабатывает SUCCESS', () => {
    const action: BurgerAction = {
      type: BurgerActionTypes.SUCCESS,
      payload: sampleData,
    };
    const state = BurgerIngredientsReducers(
      { data: null, loading: true, error: false },
      action
    );
    expect(state).toEqual({ data: sampleData, loading: false, error: false });
  });

  it('обрабатывает FAILED', () => {
    const action: BurgerAction = {
      type: BurgerActionTypes.FAILED,
      payload: 'Ошибка',
    };
    const state = BurgerIngredientsReducers(
      { data: null, loading: true, error: false },
      action
    );
    expect(state).toEqual({ data: null, loading: false, error: true });
  });
});
