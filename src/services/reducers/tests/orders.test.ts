import { ordersReducer, OrdersState } from '../orders';
import {
  WS_SET_ORDERS,
  WS_CLEAR_ORDERS,
  wsSetOrders,
  wsClearOrders,
  IOrder,
  IWsSetOrdersPayload,
} from '../../actions/orders';

describe('ordersReducer', () => {
  const initialState: OrdersState = {
    orders: [],
    total: 0,
    totalToday: 0,
  };

  const sampleOrders: IOrder[] = [
    {
      _id: '1',
      number: 1001,
      status: 'done',
      ingredients: ['ing1', 'ing2'],
      createdAt: '2025-09-03T10:00:00.000Z',
      updatedAt: '2025-09-03T10:10:00.000Z',
      name: 'Order 1',
    },
    {
      _id: '2',
      number: 1002,
      status: 'pending',
      ingredients: ['ing3'],
      createdAt: '2025-09-03T11:00:00.000Z',
      updatedAt: '2025-09-03T11:05:00.000Z',
      name: 'Order 2',
    },
  ];

  const payload: IWsSetOrdersPayload = {
    orders: sampleOrders,
    total: 500,
    totalToday: 20,
  };

  it('возвращает начальное состояние', () => {
    expect(ordersReducer(undefined, { type: '' } as any)).toEqual(initialState);
  });

  it('обрабатывает WS_SET_ORDERS', () => {
    const action = wsSetOrders(payload);
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      orders: sampleOrders,
      total: 500,
      totalToday: 20,
    });
  });

  it('обрабатывает WS_CLEAR_ORDERS', () => {
    const stateWithOrders: OrdersState = {
      orders: sampleOrders,
      total: 500,
      totalToday: 20,
    };
    const action = wsClearOrders();
    const state = ordersReducer(stateWithOrders, action);
    expect(state).toEqual(initialState);
  });
});
