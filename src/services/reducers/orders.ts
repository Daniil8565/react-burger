// services/reducers/orders.ts
import {
  WS_SET_ORDERS,
  WS_CLEAR_ORDERS,
  OrdersActions,
  IOrder,
} from '../actions/orders';

export interface OrdersState {
  orders: IOrder[];
  total: number;
  totalToday: number;
}

export const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
};

export const ordersReducer = (
  state: OrdersState = initialState,
  action: OrdersActions
): OrdersState => {
  switch (action.type) {
    case WS_SET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case WS_CLEAR_ORDERS:
      return initialState;
    default:
      return state;
  }
};
