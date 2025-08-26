import { Dispatch } from 'redux';
import { OrderAction, OrderActionTypes } from '../../types/OrderDetails';
import { RootState } from '../store';
import { request } from '../../utils/request';

export const sendOrder = (ingredientIds: string[]) => {
  return async (dispatch: Dispatch<OrderAction>, getState: () => RootState) => {
    dispatch({ type: OrderActionTypes.POST_ORDER_REQUEST });

    try {
      // Получаем токен из Redux
      const token = getState().authReducer.accessToken;

      if (!token) {
        throw new Error('Нет токена для отправки заказа');
      }

      const data = await request('orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token, // передаем полный токен с Bearer
        },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });

      dispatch({
        type: OrderActionTypes.POST_ORDER_SUCCESS,
        payload: data.order.number,
      });
    } catch (err) {
      console.error('Ошибка отправки заказа:', err);
      dispatch({ type: OrderActionTypes.POST_ORDER_FAILED });
    }
  };
};
