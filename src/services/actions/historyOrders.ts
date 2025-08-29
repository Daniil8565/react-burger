export const ORDERS_WS_CONNECT = 'ORDERS_WS_CONNECT' as const;
export const ORDERS_WS_DISCONNECT = 'ORDERS_WS_DISCONNECT' as const;

export const ORDERS_WS_MESSAGE = 'ORDERS_WS_MESSAGE' as const;
export const ORDERS_WS_CLEAR = 'ORDERS_WS_CLEAR' as const;

export interface IOrder {
  _id: string;
  number: number;
  status: 'done' | 'pending' | 'created';
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IWsMessagePayload {
  orders: IOrder[];
  total: number;
  totalToday: number;
}

export const wsConnect = () => ({ type: ORDERS_WS_CONNECT });
export const wsDisconnect = () => ({ type: ORDERS_WS_DISCONNECT });

export const wsMessage = (payload: IWsMessagePayload) => ({
  type: ORDERS_WS_MESSAGE,
  payload,
});

export const wsClearOrders = () => ({ type: ORDERS_WS_CLEAR });

export type HistoryOrdersActions =
  | ReturnType<typeof wsConnect>
  | ReturnType<typeof wsDisconnect>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsClearOrders>;
