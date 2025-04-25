import React from 'react';
import logo from '../../images/done.png';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
  return (
    <div className={styles.contentModal}>
      <p
        className="text text_type_digits-large"
        style={{ marginBottom: '32px' }}
      >
        034536
      </p>
      <p
        className="text text_type_main-medium"
        style={{ marginBottom: '60px' }}
      >
        идентификатор заказа
      </p>
      <img src={logo} alt="" style={{ width: '120px', height: '120px' }} />
      <p
        className="text text_type_main-small"
        style={{ marginTop: '60px', marginBottom: '8px' }}
      >
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
