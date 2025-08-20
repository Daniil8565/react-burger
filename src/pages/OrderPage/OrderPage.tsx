import React from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderPage = () => {
  const { id } = useParams();

  return (
    <div>
      <Link to="/feed">← Назад к ленте</Link>
      <h1>Заказ #{id}</h1>

      {/* Здесь можно будет подтянуть детали заказа с API */}
      <section>
        <p>Название: Star Starship Main бургер</p>
        <p>Цена: 400 💠</p>
        <p>Статус: Готов</p>
      </section>
    </div>
  );
};

export default OrderPage;
