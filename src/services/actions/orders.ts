// services/actions/orders.ts

export const WS_CONNECT = 'WS_CONNECT' as const;
export const WS_DISCONNECT = 'WS_DISCONNECT' as const;

export const WS_SET_ORDERS = 'WS_SET_ORDERS' as const;
export const WS_CLEAR_ORDERS = 'WS_CLEAR_ORDERS' as const;

export interface IOrder {
  _id: string;
  number: number;
  status: 'done' | 'pending' | 'created';
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IWsSetOrdersPayload {
  orders: IOrder[];
  total: number;
  totalToday: number;
}

export const wsConnect = () => ({ type: WS_CONNECT });
export const wsDisconnect = () => ({ type: WS_DISCONNECT });

export const wsSetOrders = (payload: IWsSetOrdersPayload) => ({
  type: WS_SET_ORDERS,
  payload,
});

export const wsClearOrders = () => ({ type: WS_CLEAR_ORDERS });

export type OrdersActions =
  | ReturnType<typeof wsConnect>
  | ReturnType<typeof wsDisconnect>
  | ReturnType<typeof wsSetOrders>
  | ReturnType<typeof wsClearOrders>;
