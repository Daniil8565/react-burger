import { orderReducer } from '../OrderDetails';
import {
  IOrderState,
  OrderActionTypes,
  OrderAction,
} from '../../../types/OrderDetails';

describe('orderReducer', () => {
  const initialState: IOrderState = {
    orderNumber: null,
    loading: false,
    error: false,
  };

  it('возвращает начальное состояние', () => {
    expect(orderReducer(undefined, { type: '' } as any)).toEqual(initialState);
  });

  it('обрабатывает POST_ORDER_REQUEST', () => {
    const action: OrderAction = { type: OrderActionTypes.POST_ORDER_REQUEST };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      orderNumber: null,
      loading: true,
      error: false,
    });
  });

  it('обрабатывает POST_ORDER_SUCCESS', () => {
    const action: OrderAction = {
      type: OrderActionTypes.POST_ORDER_SUCCESS,
      payload: 1234,
    };
    const state = orderReducer({ ...initialState, loading: true }, action);
    expect(state).toEqual({
      orderNumber: 1234,
      loading: false,
      error: false,
    });
  });

  it('обрабатывает POST_ORDER_FAILED', () => {
    const action: OrderAction = { type: OrderActionTypes.POST_ORDER_FAILED };
    const state = orderReducer({ ...initialState, loading: true }, action);
    expect(state).toEqual({
      orderNumber: null,
      loading: false,
      error: true,
    });
  });

  it('обрабатывает CLEAR_ORDER', () => {
    const action: OrderAction = { type: OrderActionTypes.CLEAR_ORDER };
    const state = orderReducer(
      { orderNumber: 1234, loading: false, error: false },
      action
    );
    expect(state).toEqual(initialState);
  });
});
