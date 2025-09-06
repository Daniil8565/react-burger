import { store } from '../../store';
import { BurgerConstructorReducer } from '../../reducers/BurgerConstructor';
import {
  UPDATE_TYPE,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from '../../actions/BurgerConstructor';
import { BurgerIngredientsReducers } from '../../reducers/BurgerIngredients';
import { IConstructorIngredient } from '../../../types/BurgerIngrediend';
import { authReducer } from '../../reducers/authReducers';
import { LOGIN_SUCCESS } from '../../../types/Authtypes';

describe('Redux store', () => {
  it('инициализирует store с правильным состоянием', () => {
    const state = store.getState();

    expect(state.BurgerConstructorReducer).toEqual({
      bun: null,
      ingredients: [],
    });

    expect(state.BurgerIngredientsReducers).toEqual({
      data: [],
      loading: true,
      error: false,
    });

    expect(state.authReducer.isAuthenticated).toBe(false);
  });

  it('обрабатывает dispatch действий BurgerConstructorReducer', () => {
    const ingredient: IConstructorIngredient = {
      uuid: 'ing-1',
      _id: '111',
      name: 'Сыр',
      type: 'main',
      price: 20,
      image: 'cheese.png',
      __v: 0,
      proteins: 5,
      fat: 10,
      carbohydrates: 1,
      calories: 50,
      image_mobile: '',
      image_large: '',
    };

    store.dispatch({ type: UPDATE_TYPE, item: ingredient });

    const state = store.getState();
    expect(state.BurgerConstructorReducer.ingredients).toContainEqual(
      ingredient
    );
  });

  it('обрабатывает dispatch действий authReducer', () => {
    const userPayload = {
      user: { email: 'test@test.com', name: 'Test' },
      accessToken: 'token',
    };
    store.dispatch({ type: LOGIN_SUCCESS, payload: userPayload });

    const state = store.getState();
    expect(state.authReducer.isAuthenticated).toBe(true);
    expect(state.authReducer.user).toEqual(userPayload.user);
  });
});
