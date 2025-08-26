import {
  ORDERS_WS_MESSAGE,
  ORDERS_WS_CLEAR,
  HistoryOrdersActions,
  IOrder,
} from '../actions/historyOrders';

export interface OrdersState {
  orders: IOrder[];
  total: number;
  totalToday: number;
}

const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
};

export const historyOrdersReducer = (
  state: OrdersState = initialState,
  action: HistoryOrdersActions
): OrdersState => {
  switch (action.type) {
    case ORDERS_WS_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case ORDERS_WS_CLEAR:
      return initialState;
    default:
      return state;
  }
};
