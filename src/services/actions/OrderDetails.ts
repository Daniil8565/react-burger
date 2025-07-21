import { Dispatch } from 'redux';
import { OrderAction, OrderActionTypes } from '../../types/OrderDetails';
import { request } from '../../utils/request';

export const sendOrder = (ingredientIds: string[]) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    dispatch({ type: OrderActionTypes.POST_ORDER_REQUEST });

    try {
      const data = await request('orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });

      dispatch({
        type: OrderActionTypes.POST_ORDER_SUCCESS,
        payload: data.order.number,
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: OrderActionTypes.POST_ORDER_FAILED });
    }
  };
};
