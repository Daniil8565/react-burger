import React from 'react';
import styles from './Feed.module.css';
import { Link, useLocation } from 'react-router-dom';

const Feed = () => {
  const location = useLocation();
  return (
    <div className={styles.container}>
      {/* Левая колонка */}
      <section className={styles.feed}>
        <h1 className={styles.feed__title}>Лента заказов</h1>

        <Link
          to={`/feed/034535`}
          className={styles['order-card']}
          state={{ background: location }}
        >
          <header className={styles['order-card__header']}>
            <span className={styles['order-card__id']}>#034535</span>
            <span className={styles['order-card__time']}>Сегодня, 16:20</span>
          </header>
          <h2 className={styles['order-card__name']}>
            Star Starship Main бургер
          </h2>
          <div className={styles['order-card__ingredients']}>
            <img src="https://via.placeholder.com/40" alt="ингредиент" />
            <img src="https://via.placeholder.com/40" alt="ингредиент" />
            <img src="https://via.placeholder.com/40" alt="ингредиент" />
          </div>
          <div className={styles['order-card__footer']}>
            <span className={styles['order-card__price']}>400</span>
            <span className={styles['order-card__currency']}>💠</span>
          </div>
        </Link>

        <Link
          to={`/feed/034534`}
          className={styles['order-card']}
          state={{ background: location }}
        >
          <header className={styles['order-card__header']}>
            <span className={styles['order-card__id']}>#034534</span>
            <span className={styles['order-card__time']}>Сегодня, 13:20</span>
          </header>
          <h2 className={styles['order-card__name']}>Interstellar бургер</h2>
          <div className={styles['order-card__ingredients']}>
            <img src="https://via.placeholder.com/40" alt="ингредиент" />
            <img src="https://via.placeholder.com/40" alt="ингредиент" />
          </div>
          <div className={styles['order-card__footer']}>
            <span className={styles['order-card__price']}>560</span>
            <span className={styles['order-card__currency']}>💠</span>
          </div>
        </Link>

        <Link
          to={`/feed/034533`}
          className={styles['order-card']}
          state={{ background: location }}
        >
          <header className={styles['order-card__header']}>
            <span className={styles['order-card__id']}>#034533</span>
            <span className={styles['order-card__time']}>Вчера, 13:50</span>
          </header>
          <h2 className={styles['order-card__name']}>
            Black Hole Singularity острый бургер
          </h2>
          <div className={styles['order-card__ingredients']}>
            <img src="https://via.placeholder.com/40" alt="ингредиент" />
            <img src="https://via.placeholder.com/40" alt="ингредиент" />
            <img src="https://via.placeholder.com/40" alt="ингредиент" />
          </div>
          <div className={styles['order-card__footer']}>
            <span className={styles['order-card__price']}>510</span>
            <span className={styles['order-card__currency']}>💠</span>
          </div>
        </Link>
      </section>

      {/* Правая колонка */}
      <aside className={styles.summary}>
        <div className={styles.summary__section}>
          <div className={`${styles.ready}`}>
            <h2>Готовы:</h2>
            <ul className={`${styles.summary__list}`}>
              <li>034533</li>
              <li>034532</li>
              <li>034530</li>
              <li>034527</li>
            </ul>
          </div>
          <div className={`${styles.progress}`}>
            <h2>В работе:</h2>
            <ul className={`${styles.summary__list}`}>
              <li>034538</li>
              <li>034541</li>
              <li>034542</li>
            </ul>
          </div>
        </div>

        <div className={styles.summary__Allthetime}>
          <h2 className="text text_type_main-medium">
            Выполнено за все время:
          </h2>
          <p
            className={styles.summary__number + ' text text_type_digits-large'}
          >
            28752
          </p>
        </div>

        <div className={styles.summary__today}>
          <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
          <p
            className={styles.summary__number + ' text text_type_digits-large'}
          >
            138
          </p>
        </div>
      </aside>
    </div>
  );
};

export default Feed;
