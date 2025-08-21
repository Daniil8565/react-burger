import { useParams } from 'react-router-dom';
import {
  CurrencyIcon,
  CheckMarkIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderDetailsPage.module.css';

// Типы ингредиента и заказа
type Ingredient = {
  name: string;
  count: number;
  price: number;
  image: string;
};

type Order = {
  id: string;
  title: string;
  status: string;
  time: string;
  ingredients: Ingredient[];
};

// Моковые заказы
const mockOrders: Record<string, Order> = {
  '034533': {
    id: '#034533',
    title: 'Black Hole Singularity острый бургер',
    status: 'Выполнен',
    time: 'Вчера, 13:50',
    ingredients: [
      {
        name: 'Флюоресцентная булка R2-D3',
        count: 2,
        price: 20,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      },
      {
        name: 'Филе Люминесцентного тетраодонтиформа',
        count: 1,
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      },
      {
        name: 'Соус традиционный галактический',
        count: 1,
        price: 30,
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
      },
      {
        name: 'Плоды фалленианского дерева',
        count: 1,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sp_1.png',
      },
    ],
  },
};

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const order = mockOrders[id || '034533'];

  if (!order) return <p>Заказ не найден</p>;

  const total = order.ingredients.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <div className={styles.container}>
      <p className={styles.id}>{order.id}</p>
      <h1 className={styles.title}>{order.title}</h1>
      <div className={styles.status}>
        <CheckMarkIcon type="success" />
        <span className={styles.statusText}>{order.status}</span>
      </div>
      <h2 className={styles.subtitle}>Состав:</h2>
      <div className={styles.ingredients}>
        {order.ingredients.map((ing, idx) => (
          <div key={idx} className={styles.ingredient}>
            <div className={styles.imgBox}>
              <img src={ing.image} alt={ing.name} />
            </div>
            <p className={styles.ingName}>{ing.name}</p>
            <div className={styles.priceBox}>
              <span>
                {ing.count} x {ing.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <span className={styles.time}>{order.time}</span>
        <div className={styles.total}>
          <span>{total}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
