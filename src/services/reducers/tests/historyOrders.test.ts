import {
  historyOrdersReducer,
  initialState,
  OrdersState,
} from '../historyOrders';
import {
  wsMessage,
  wsClearOrders,
  IOrder,
  IWsMessagePayload,
} from '../../actions/historyOrders';

describe('historyOrdersReducer', () => {
  const sampleOrders: IOrder[] = [
    {
      _id: '1',
      number: 1001,
      status: 'done',
      ingredients: ['ing1', 'ing2'],
      createdAt: '2025-09-03T10:00:00.000Z',
      updatedAt: '2025-09-03T10:10:00.000Z',
    },
    {
      _id: '2',
      number: 1002,
      status: 'pending',
      ingredients: ['ing3'],
      createdAt: '2025-09-03T11:00:00.000Z',
      updatedAt: '2025-09-03T11:05:00.000Z',
    },
  ];

  const payload: IWsMessagePayload = {
    orders: sampleOrders,
    total: 500,
    totalToday: 20,
  };

  it('возвращает начальное состояние', () => {
    expect(historyOrdersReducer(undefined, { type: '' } as any)).toEqual(
      initialState
    );
  });

  it('обрабатывает ORDERS_WS_MESSAGE', () => {
    const action = wsMessage(payload);
    const state = historyOrdersReducer(initialState, action);
    expect(state).toEqual({
      orders: sampleOrders,
      total: 500,
      totalToday: 20,
    });
  });

  it('обрабатывает ORDERS_WS_CLEAR', () => {
    const stateWithOrders: OrdersState = {
      orders: sampleOrders,
      total: 500,
      totalToday: 20,
    };
    const action = wsClearOrders();
    const state = historyOrdersReducer(stateWithOrders, action);
    expect(state).toEqual(initialState);
  });
});
