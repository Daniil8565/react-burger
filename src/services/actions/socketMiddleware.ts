import { TSocketActions } from '../../types/socketMiddleware';

export const ordersWsActions: TSocketActions = {
  wsConnect: 'ORDERS_WS_CONNECT',
  wsDisconnect: 'ORDERS_WS_DISCONNECT',
  onOpen: 'ORDERS_WS_OPEN',
  onClose: 'ORDERS_WS_CLOSE',
  onError: 'ORDERS_WS_ERROR',
  onMessage: 'WS_SET_ORDERS', // <--- ДОЛЖНО СОВПАДАТЬ С РЕДЮСЕРОМ!
  wsSend: 'ORDERS_WS_SEND',
};

export const historyOrdersWsActions: TSocketActions = {
  wsConnect: 'HISTORY_ORDERS_WS_CONNECT',
  wsDisconnect: 'HISTORY_ORDERS_WS_DISCONNECT',
  onOpen: 'HISTORY_ORDERS_WS_OPEN',
  onClose: 'HISTORY_ORDERS_WS_CLOSE',
  onError: 'HISTORY_ORDERS_WS_ERROR',
  onMessage: 'ORDERS_WS_MESSAGE', // <--- ДОЛЖНО СОВПАДАТЬ С РЕДЮСЕРОМ!
  wsSend: 'HISTORY_ORDERS_WS_SEND',
};
