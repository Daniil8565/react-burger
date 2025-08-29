import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socketMiddleware';
import {
  ordersWsActions,
  historyOrdersWsActions,
} from './actions/socketMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(ordersWsActions),
      socketMiddleware(historyOrdersWsActions)
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
