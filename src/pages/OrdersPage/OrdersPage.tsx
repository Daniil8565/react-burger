import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrdersPage.module.css';
import { RootState, store } from '../../services/store';
import { wsConnect, wsDisconnect } from '../../services/actions/historyOrders';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { historyOrdersWsActions } from '../../services/actions/socketMiddleware';
import { API_WEBSOCKET } from '../../constant';

export default function OrdersPage() {
  const location = useLocation();
  const dispatch = useTypedDispatch();
  const data = useTypedSelector(
    (state) => state.BurgerIngredientsReducers.data
  );
  const token = store
    .getState()
    .authReducer.accessToken?.replace('Bearer ', '');
  const { orders } = useTypedSelector(
    (state: RootState) => state.historyOrders
  );
  console.log(orders);
  useEffect(() => {
    dispatch({
      type: historyOrdersWsActions.wsConnect,
      payload: { url: `${API_WEBSOCKET}?token=${token}` },
    });

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  // Функция для отображения статуса
  const getStatusText = (status: string) => {
    switch (status) {
      case 'done':
        return 'Выполнен';
      case 'pending':
        return 'Готовится';
      case 'created':
        return 'Создан';
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {orders.map((order) => {
          const totalPrice = order.ingredients.reduce((sum, ingredientId) => {
            const ingredientData = data!.find(
              (item) => item._id === ingredientId
            );
            return ingredientData ? sum + ingredientData.price : sum;
          }, 0);
          return (
            <Link
              key={order._id}
              to={`/profile/orders/${order._id}`}
              state={{ background: location }}
              className={styles.item}
            >
              <div className={styles.header}>
                <span className={styles.id}>#{order.number}</span>
                <span className={styles.clock}>
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              <h2 className={styles.title}>Бургер #{order.number}</h2>

              {order.status && (
                <div className="mt-1 text-sm flex items-center gap-1">
                  <span
                    className={`${styles.status} order.status === 'done' ? 'text-green-400' : 'text-blue-400'`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
              )}

              <div className={styles.footer}>
                <div>
                  {/* Здесь можно отображать иконки ингредиентов */}
                  {order.ingredients.slice(0, 5).map((ingredientId, index) => {
                    const ingredientData = data!.find(
                      (item) => item._id === ingredientId
                    );
                    return ingredientData ? (
                      <img
                        key={index}
                        src={ingredientData.image}
                        alt={ingredientData.name}
                        className={styles.ingredientImage}
                      />
                    ) : null;
                  })}
                  {order.ingredients.length > 5 && (
                    <span>+{order.ingredients.length - 5}</span>
                  )}
                </div>

                <div className="flex justify-end mt-4 text-lg font-bold items-center gap-1">
                  <span className={styles['order-card__price']}>
                    {totalPrice}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
