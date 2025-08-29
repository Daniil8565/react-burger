import { Dispatch } from 'redux';
import { BurgerAction, BurgerActionTypes } from '../../types/BurgerIngrediend';
import { request } from '../../utils/request';
import { AppDispatch } from '../store';

export function getBurgerIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: BurgerActionTypes.LOADING,
    });

    request('ingredients')
      .then((data) => {
        dispatch({
          type: BurgerActionTypes.SUCCESS,
          payload: data.data, // массив ингредиентов
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: BurgerActionTypes.FAILED,
          payload: 'Произошла ошибка при загрузке данных',
        });
      });
  };
}
