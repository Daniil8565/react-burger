import React, { useEffect } from 'react';
import styles from './Feed.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { wsConnect, wsDisconnect } from '../../services/actions/orders';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Feed: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const data = useTypedSelector(
    (state) => state.BurgerIngredientsReducers.data
  );
  const { orders, total, totalToday } = useSelector(
    (state: RootState) => state.orders
  );
  console.log(orders, total, totalToday);
  useEffect(() => {
    dispatch(wsConnect());
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  const doneOrders = orders.filter((o) => o.status === 'done').slice(0, 10);
  const pendingOrders = orders.filter((o) => o.status !== 'done').slice(0, 10);

  // Хелпер для нарезки массива по 10 элементов
  const chunkArray = <T,>(arr: T[], size: number): T[][] =>
    arr.reduce<T[][]>((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  const doneOrdersChunks = chunkArray(doneOrders, 10);
  const pendingOrdersChunks = chunkArray(pendingOrders, 10);

  return (
    <div className={styles.container}>
      <h1 className={styles.feed__title}>Лента заказов</h1>

      {/* Левая колонка */}
      <div className={styles.content}>
        <section className={styles.feed}>
          <div className={styles.orderCart}>
            {orders.map((order) => {
              // вычисляем стоимость заказа
              const totalPrice = order.ingredients.reduce(
                (sum, ingredientId) => {
                  const ingredientData = data!.find(
                    (item) => item._id === ingredientId
                  );
                  return ingredientData ? sum + ingredientData.price : sum;
                },
                0
              );

              return (
                <Link
                  key={order._id}
                  to={`/feed/${order.number}`}
                  className={styles['order-card']}
                  state={{ background: location }}
                >
                  <header className={styles['order-card__header']}>
                    <span className={styles.id}>#{order.number}</span>
                    <span className={styles['order-card__time']}>
                      {new Date(order.createdAt).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </header>

                  <p
                    className={`${styles.title} text text_type_digits-default`}
                  >
                    {order.name}
                  </p>
                  <div className={styles.footer}>
                    <div className={styles.ingredients}>
                      {order.ingredients
                        .slice(0, 5)
                        .map((ingredientId, index) => {
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

                      {/* Если ингредиентов больше 5 — выводим "+N" */}
                      {order.ingredients.length > 5 && (
                        <div
                          className={`${styles.ingredientImage} ${styles.extra}`}
                        >
                          +{order.ingredients.length - 5}
                        </div>
                      )}
                    </div>

                    {/* Цена заказа */}
                    <div className={styles['order-card__footer']}>
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
        </section>

        {/* Правая колонка */}
        <aside className={styles.summary}>
          <div className={styles.summary__section}>
            <div className={styles.ready}>
              <h2>Готовы:</h2>
              <div className={styles.columns}>
                {doneOrdersChunks.map((chunk, idx) => (
                  <ul key={idx} className={styles.summary__list}>
                    {chunk.map((o) => (
                      <li key={o._id}>{o.number}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            <div className={styles.progress}>
              <h2>В работе:</h2>
              <div className={styles.columns}>
                {pendingOrdersChunks.map((chunk, idx) => (
                  <ul key={idx} className={styles.summary__list}>
                    {chunk.map((o) => (
                      <li key={o._id}>{o.number}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.summary__Allthetime}>
            <h2 className={styles.header}>Выполнено за все время:</h2>
            <p className="text text_type_digits-large">{total}</p>
          </div>

          <div className={styles.summary__today}>
            <h2 className={styles.header}>Выполнено за сегодня:</h2>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Feed;
