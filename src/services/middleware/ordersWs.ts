// services/middleware/ordersWs.ts
import { Middleware } from 'redux';
import {
  WS_CONNECT,
  WS_DISCONNECT,
  wsSetOrders,
  wsClearOrders,
  OrdersActions,
  IWsSetOrdersPayload,
} from '../actions/orders';
import { RootState } from '../reducers/index';
import { API_WEBSOCKET } from '../../constant';

const WS_URL = `${API_WEBSOCKET}/all`;

export const ordersWsMiddleware: Middleware<{}, RootState> = (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action) => {
    const typedAction = action as OrdersActions;

    switch (typedAction.type) {
      case WS_CONNECT: {
        if (socket !== null) {
          socket.close();
        }
        socket = new WebSocket(WS_URL);

        socket.onopen = () => {
          console.log('WS connected');
        };

        socket.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data) as {
            success: boolean;
            orders: IWsSetOrdersPayload['orders'];
            total: number;
            totalToday: number;
          };

          if (data.success) {
            store.dispatch(
              wsSetOrders({
                orders: data.orders,
                total: data.total,
                totalToday: data.totalToday,
              })
            );
          }
        };

        socket.onclose = () => {
          console.log('WS closed');
          store.dispatch(wsClearOrders());
        };
        break;
      }

      case WS_DISCONNECT: {
        if (socket !== null) {
          socket.close();
          socket = null;
        }
        break;
      }

      default:
        break;
    }

    return next(action);
  };
};
