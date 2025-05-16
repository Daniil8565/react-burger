import { Dispatch } from 'redux';
import { BurgerAction, BurgerActionTypes } from '../../types/BurgerIngrediend';
import { API_URL } from '../../constant';

export function getBurgerIngredients() {
  return function (dispatch: Dispatch<BurgerAction>) {
    dispatch({
      type: BurgerActionTypes.LOADING,
    });
    fetch(API_URL)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          dispatch({
            type: BurgerActionTypes.FAILED,
            payload: 'Произошла ошибка при загрузке данных',
          });
        }
      })
      .then((data) => {
        console.log(data.data);
        dispatch({
          type: BurgerActionTypes.SUCCESS,
          payload: data.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: BurgerActionTypes.FAILED,
          payload: 'Произошла ошибка при загрузке данных',
        });
      });
  };
}
