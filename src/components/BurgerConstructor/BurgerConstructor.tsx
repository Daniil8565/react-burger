import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import { useDrop } from 'react-dnd';
import OrderDetails from '../OrderDetails/OrderDetails';
import {
  UPDATE_TYPE,
  DELETE_INGREDIENT,
} from '../../services/actions/BurgerConstructor';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';
import SortableIngredient from '../SortableIngredient/SortableIngredient';

const BurgerConstructor = () => {
  const [modal, setModal] = React.useState(false);
  const dispatch = useDispatch();
  const { bun, ingredients } = useTypedSelector(
    (state) => state.BurgerConstructorReducer
  );

  const { sendOrder } = useActions();

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

  const totalPrice = React.useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum, item) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const ref: unknown = dropTarget;

  return (
    <section className={styles.BurgerConstructor}>
      <div
        className={styles.ListBurgerWrapper}
        ref={ref as React.Ref<HTMLDivElement> | undefined}
      >
        {/* Верхняя булка */}
        {bun ? (
          <div className={styles.Bun}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        ) : (
          <div className={styles.placeholder}>
            Перетащите сюда булку для начала сборки 🍔
          </div>
        )}

        <div className={styles.ScrollableIngredients}>
          {ingredients.map((ingredient, index) => (
            <SortableIngredient
              key={index}
              ingredient={ingredient}
              index={index}
            />
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
          <p className="text text_type_main-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            if (!bun) return;

            const ingredientsIds = [
              bun._id,
              ...ingredients.map((item) => item._id),
              bun._id,
            ];

            sendOrder(ingredientsIds);
            setModal(true);
          }}
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
