import { Middleware } from 'redux';
import { TSocketActions } from '../../types/socketMiddleware';

export const socketMiddleware =
  (wsActions: TSocketActions): Middleware =>
  (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: unknown) => {
      const typedAction = action as { type: string; payload?: any };

      switch (typedAction.type) {
        case wsActions.wsConnect: {
          const { url } = typedAction.payload;
          if (socket) {
            socket.close();
          }
          socket = new WebSocket(url);

          socket.onopen = (event) =>
            store.dispatch({ type: wsActions.onOpen, payload: event });
          socket.onerror = (event) =>
            store.dispatch({ type: wsActions.onError, payload: event });
          socket.onclose = (event) =>
            store.dispatch({ type: wsActions.onClose, payload: event });
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            store.dispatch({ type: wsActions.onMessage, payload: data });
          };
          break;
        }
        case wsActions.wsDisconnect: {
          if (socket) {
            socket.close();
            socket = null;
          }
          break;
        }
        case wsActions.wsSend: {
          if (socket && socket.readyState === 1) {
            socket.send(JSON.stringify(typedAction.payload));
          }
          break;
        }
        default:
          break;
      }

      return next(action);
    };
  };
