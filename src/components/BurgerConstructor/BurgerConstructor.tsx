import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { dataArray } from '../../utils/data';
import styles from './BurgerConstructor.module.css';
import Logo from '../../images/bun-02.png';
import Modal from '../Modal/Modal';
import { useDrop } from 'react-dnd';
import OrderDetails from '../OrderDetails/OrderDetails';
import { UPDATE_TYPE } from '../../services/actions/BurgerConstructor';
import { useDispatch, useSelector } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const BurgerConstructor = () => {
  const [modal, setModal] = React.useState(false);
  const dispatch = useDispatch();
  const { bun, ingredients } = useTypedSelector(
    (state) => state.BurgerConstructorReducer
  );

  const [, dropTarget] = useDrop({
    accept: 'Ingredient',
    drop(item) {
      console.log('Item dropped:', item);
      dispatch({
        type: UPDATE_TYPE,
        item,
      });
    },
  });

  const ref: unknown = dropTarget;

  return (
    <section className={styles.BurgerConstructor}>
      <div
        className={styles.ListBurgerWrapper}
        ref={ref as React.Ref<HTMLDivElement> | undefined}
      >
        {/* Верхняя булка */}
        {bun && (
          <div className={styles.Bun}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

        {/* Начинки */}
        <div className={styles.ScrollableIngredients}>
          {ingredients.map((ingredient, index) => (
            <div key={index} className={styles.burgerItem}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>

        {/* Нижняя булка */}
        {bun && (
          <div className={styles.Bun}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>

      {/* Кнопка и цена */}
      <div className={styles.buttonAndPrice}>
        <div className={styles.priceAndIcon}>
          <p className="text text_type_main-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => setModal(!modal)}
        >
          Оформить заказ
        </Button>
      </div>

      {/* Модалка */}
      {modal && (
        <Modal onClick={() => setModal(false)}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
