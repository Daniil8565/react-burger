import { Middleware } from 'redux';
import { RootState } from '../reducers';
import {
  ORDERS_WS_CONNECT,
  ORDERS_WS_DISCONNECT,
  wsMessage,
  wsClearOrders,
  HistoryOrdersActions,
  IWsMessagePayload,
} from '../actions/historyOrders';

const WS_URL = 'wss://norma.nomoreparties.space/orders';

export const historyOrdersWsMiddleware: Middleware<{}, RootState> = (store) => {
  let socket: WebSocket | null = null;
  let reconnectTimer: number | null = null;

  return (next) => (action: unknown) => {
    const typedAction = action as HistoryOrdersActions;

    switch (typedAction.type) {
      case ORDERS_WS_CONNECT: {
        if (socket) {
          socket.close();
          socket = null;
        }

        const token = store
          .getState()
          .authReducer.accessToken?.replace('Bearer ', '');
        console.log('token', token);
        if (!token) return; // если нет токена, не подключаем WS
        console.log(`${WS_URL}?token=${token}`);
        socket = new WebSocket(`${WS_URL}?token=${token}`);

        socket.onopen = () => {
          console.log('WS connected');
          if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
          }
        };

        socket.onmessage = (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data) as {
              success: boolean;
              orders: IWsMessagePayload['orders'];
              total: number;
              totalToday: number;
            };
            console.log('data', data);
            if (data.success) {
              store.dispatch(
                wsMessage({
                  orders: data.orders,
                  total: data.total ?? 0,
                  totalToday: data.totalToday ?? 0,
                })
              );
            }
          } catch (err) {
            console.error('Ошибка парсинга WS сообщения', err);
          }
        };

        socket.onclose = () => {
          console.log('WS closed');
          store.dispatch(wsClearOrders());
          reconnectTimer = window.setTimeout(() => {
            store.dispatch({ type: ORDERS_WS_CONNECT });
          }, 3000);
        };

        socket.onerror = () => {
          console.error('Ошибка WS');
          store.dispatch(wsClearOrders());
        };

        break;
      }

      case ORDERS_WS_DISCONNECT: {
        if (socket) {
          socket.close();
          socket = null;
        }
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }
        store.dispatch(wsClearOrders());
        break;
      }

      default:
        break;
    }

    return next(action);
  };
};
