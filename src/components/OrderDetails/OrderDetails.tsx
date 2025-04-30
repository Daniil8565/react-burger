import React from 'react';
import logo from '../../images/done.png';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
  return (
    <div className={styles.contentModal}>
      <p className={`text text_type_digits-large ${styles.isDigit}`}>034536</p>
      <p className={`text text_type_main-medium ${styles.title}`}>
        идентификатор заказа
      </p>
      <img src={logo} alt="Заказ оформлен" className={styles.image} />
      <p className={`text text_type_main-small ${styles.description}`}>
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
