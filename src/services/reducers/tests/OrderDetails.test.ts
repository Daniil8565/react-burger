import { orderReducer, initialState } from '../OrderDetails';
import { OrderActionTypes, OrderAction } from '../../../types/OrderDetails';

describe('orderReducer', () => {
  it('возвращает начальное состояние', () => {
    expect(orderReducer(undefined, { type: '' } as any)).toEqual(initialState);
  });

  it('обрабатывает POST_ORDER_REQUEST', () => {
    const action: OrderAction = { type: OrderActionTypes.POST_ORDER_REQUEST };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('обрабатывает POST_ORDER_SUCCESS', () => {
    const action: OrderAction = {
      type: OrderActionTypes.POST_ORDER_SUCCESS,
      payload: 1234,
    };
    const state = orderReducer({ ...initialState, loading: true }, action);
    expect(state).toEqual({
      ...initialState,
      orderNumber: 1234,
    });
  });

  it('обрабатывает POST_ORDER_FAILED', () => {
    const action: OrderAction = { type: OrderActionTypes.POST_ORDER_FAILED };
    const state = orderReducer({ ...initialState, loading: true }, action);
    expect(state).toEqual({
      ...initialState,
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
