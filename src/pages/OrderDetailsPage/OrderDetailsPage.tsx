import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  CurrencyIcon,
  CheckMarkIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderDetailsPage.module.css';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();

  // Получаем все заказы и ингредиенты из стора
  const { orders } = useTypedSelector((state) => state.historyOrders);
  const ingredients = useTypedSelector(
    (state) => state.BurgerIngredientsReducers.data
  );

  // Находим заказ по id
  const order = orders.find((order) => order._id === id);

  if (!order) return <p>Заказ не найден</p>;

  // Считаем список ингредиентов (обогащаем данными из data)
  const enrichedIngredients = order.ingredients
    .map((ingredientId) => {
      const ingredientData = ingredients?.find(
        (item) => item._id === ingredientId
      );
      return ingredientData ? { ...ingredientData, count: 1 } : null;
    })
    .filter(Boolean);

  // Суммируем цену
  const total = enrichedIngredients.reduce(
    (sum, ing: any) => sum + ing.price,
    0
  );

  // Перевод статуса
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
      <h1 className={styles.title}>Бургер #{order.number}</h1>

      <div className={styles.status}>
        <CheckMarkIcon type="success" />
        <span className={styles.statusText}>{getStatusText(order.status)}</span>
      </div>

      <h2 className={styles.subtitle}>Состав:</h2>
      <div className={styles.ingredients}>
        {enrichedIngredients.map((ing: any, idx: number) => (
          <div key={idx} className={styles.ingredient}>
            <div className={styles.imgBox}>
              <img src={ing.image} alt={ing.name} />
            </div>
            <p className={styles.ingName}>{ing.name}</p>
            <div className={styles.priceBox}>
              <span>1 x {ing.price}</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <span className={styles.time}>
          {new Date(order.createdAt).toLocaleString()}
        </span>
        <div className={styles.total}>
          <span>{total}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
