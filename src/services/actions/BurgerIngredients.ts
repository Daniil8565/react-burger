// services/actions/BurgerIngredients.ts
import { Dispatch } from 'redux';
import { BurgerAction, BurgerActionTypes } from '../../types/BurgerIngrediend';
import { request } from '../../utils/request';

export function getBurgerIngredients() {
  return function (dispatch: Dispatch<BurgerAction>) {
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
