import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import styles from './OrderPage.module.css';

const OrderPage: React.FC = () => {
  const { id } = useParams(); // это order.number
  const { orders } = useSelector((state: RootState) => state.orders);
  const ingredients = useSelector(
    (state: RootState) => state.BurgerIngredientsReducers.data
  );

  const order = orders.find((o) => o.number === Number(id));

  if (!order) {
    return <p>Заказ не найден</p>;
  }

  // считаем кол-во ингредиентов
  const ingredientsCount: Record<string, number> = {};
  order.ingredients.forEach((id) => {
    ingredientsCount[id] = (ingredientsCount[id] || 0) + 1;
  });

  const orderIngredients = Object.entries(ingredientsCount)
    .map(([id, count]) => {
      const ingredientData = ingredients?.find((item) => item._id === id);
      return ingredientData ? { ...ingredientData, count } : null;
    })
    .filter(Boolean);

  const totalPrice = orderIngredients.reduce(
    (sum, item: any) => sum + item.price * item.count,
    0
  );

  return (
    <div className={styles.page}>
      <p className={styles.number}>#{order.number}</p>
      <h1 className={styles.name}>{order.name}</h1>
      <p className={styles.status}>
        {order.status === 'done' ? 'Выполнен' : 'В работе'}
      </p>

      <h2 className={styles.subtitle}>Состав:</h2>
      <ul className={styles.list}>
        {orderIngredients.map((item: any) => (
          <li key={item._id} className={styles.item}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.name} className={styles.image} />
            </div>
            <p className={styles.itemName}>{item.name}</p>
            <div className={styles.priceBlock}>
              <span className={styles.count}>
                {item.count} x {item.price}
              </span>
              <span className={styles.currency}>💠</span>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <p className={styles.date}>Вчера, 13:50</p>
        <p className={styles.total}>
          {totalPrice} <span className={styles.currency}>💠</span>
        </p>
      </div>
    </div>
  );
};

export default OrderPage;
