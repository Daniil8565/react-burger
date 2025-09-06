import logo from '../../images/done.png';
import styles from './OrderDetails.module.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const OrderDetails = () => {
  const { orderNumber, loading, error } = useTypedSelector(
    (state: any) => state.orderReducer
  );

  if (loading) {
    return <p className="text text_type_main-medium">Отправляем заказ...</p>;
  }

  if (error) {
    return (
      <p className="text text_type_main-medium text_color_error">
        Произошла ошибка при оформлении заказа.
      </p>
    );
  }

  return (
    <div className={styles.contentModal} data-testid="ingredient">
      <p className={`text text_type_digits-large ${styles.isDigit}`}>
        {orderNumber}
      </p>
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
