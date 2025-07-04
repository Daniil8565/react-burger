import { Dispatch } from 'redux';
import { OrderAction, OrderActionTypes } from '../../types/OrderDetails';
import { API_ORDER } from '../../constant';

export const sendOrder = (ingredientIds: string[]) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    dispatch({ type: OrderActionTypes.POST_ORDER_REQUEST });

    try {
      const res = await fetch(API_ORDER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });

      const data = await res.json();

      if (data.success) {
        dispatch({
          type: OrderActionTypes.POST_ORDER_SUCCESS,
          payload: data.order.number,
        });
      } else {
        dispatch({ type: OrderActionTypes.POST_ORDER_FAILED });
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: OrderActionTypes.POST_ORDER_FAILED });
    }
  };
};
