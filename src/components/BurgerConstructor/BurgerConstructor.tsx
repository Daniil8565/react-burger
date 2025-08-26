import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import { useDrop } from 'react-dnd';
import OrderDetails from '../OrderDetails/OrderDetails';
import { UPDATE_TYPE } from '../../services/actions/BurgerConstructor';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';
import SortableIngredient from '../SortableIngredient/SortableIngredient';
import { Idata } from '../../types/BurgerIngrediend';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const BurgerConstructor = ({
  setIngredientCounts,
}: {
  setIngredientCounts: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
}) => {
  const [modal, setModal] = React.useState(false);
  const dispatch = useDispatch();
  const { bun, ingredients } = useTypedSelector(
    (state) => state.BurgerConstructorReducer
  );
  const navigate = useNavigate();

  const isAuthenticated = useTypedSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const { sendOrder } = useActions();

  const [, dropTarget] = useDrop({
    accept: 'Ingredient',
    drop(item: Idata) {
      dispatch({ type: UPDATE_TYPE, item: { ...item, uuid: uuidv4() } });

      setIngredientCounts((prev) => {
        if (item.type === 'bun') return prev;

        return {
          ...prev,
          [item._id]: (prev[item._id] || 0) + 1,
        };
      });
    },
  });

  const handleRemoveIngredient = (id: string) => {
    setIngredientCounts((prev) => {
      const current = prev[id];
      if (!current || current <= 1) {
        const { [id]: _, ...rest } = prev; // удаляем ключ
        return rest;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

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
              key={ingredient._id}
              ingredient={ingredient}
              index={index}
              onRemove={() => handleRemoveIngredient(ingredient._id)}
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

            if (!isAuthenticated) {
              navigate('/login', { replace: true });
              return;
            }

            const ingredientsIds = [
              bun._id,
              ...ingredients.map((item) => item._id),
              bun._id,
            ];
            console.log(ingredientsIds);
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
