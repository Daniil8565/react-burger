import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { ordersWsMiddleware } from './middleware/ordersWs';
import type { Middleware } from 'redux';

// Явно указываем тип middleware
const wsMiddleware: Middleware = ordersWsMiddleware;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wsMiddleware),
});

// Тип состояния
export type RootState = ReturnType<typeof store.getState>;
// Тип dispatch
export type AppDispatch = typeof store.dispatch;
