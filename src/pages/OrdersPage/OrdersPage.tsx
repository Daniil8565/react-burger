import { Link, useLocation } from 'react-router-dom';
import {
  CurrencyIcon,
  CheckMarkIcon,
  LockIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrdersPage.module.css';

const orders = [
  {
    id: '034535',
    title: 'Death Star Starship Main бургер',
    status: 'Создан',
    time: 'Сегодня, 16:20',
    icons: ['🪐', '🦑', '🌊', '🍜'],
    price: 480,
  },
  {
    id: '034534',
    title: 'Interstellar бургер',
    status: 'Готовится',
    time: 'Сегодня, 13:20',
    icons: ['🪐', '🌊', '🍜', '+3'],
    price: 560,
  },
  {
    id: '034533',
    title: 'Black Hole Singularity острый бургер',
    status: 'Выполнен',
    time: 'Вчера, 13:50',
    icons: ['🪐', '🌊', '🍜'],
    price: 510,
  },
  {
    id: '034532',
    title: 'Supernova Infinity бургер',
    status: '',
    time: '2 дня назад, 21:53',
    icons: ['🪐', '🌊', '🍜'],
    price: 590,
  },
];

export default function OrdersPage() {
  const location = useLocation();
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/profile/orders/${order.id}`}
            state={{ background: location }} // 👈 сохраняем текущую страницу
            className={styles.item}
          >
            <div className={styles.header}>
              <span className={styles.id}>#{order.id}</span>
              <span className={styles.clock}>{order.time}</span>
            </div>

            <h2 className={styles.title}>{order.title}</h2>

            {order.status && (
              <div className="mt-1 text-sm flex items-center gap-1">
                {order.status === 'Выполнен' ? (
                  <CheckMarkIcon type="success" />
                ) : (
                  <LockIcon type="secondary" />
                )}
                <span
                  className={
                    order.status === 'Выполнен'
                      ? 'text-green-400'
                      : 'text-blue-400'
                  }
                >
                  {order.status}
                </span>
              </div>
            )}

            <div className={styles.footer}>
              <div>
                {order.icons.map((icon, i) => (
                  <span
                    key={i}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full px-3 py-1 text-lg shadow-md"
                  >
                    {icon}
                  </span>
                ))}
              </div>
              <div className="flex justify-end mt-4 text-lg font-bold items-center gap-1">
                {order.price}
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
