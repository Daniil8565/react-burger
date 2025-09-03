import React from 'react';
import {
  CurrencyIcon,
  ConstructorElement,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';
import { Idata, IConstructorIngredient } from '../../types/BurgerIngrediend';
import { UPDATE_TYPE } from '../../services/actions/BurgerConstructor';
import { v4 as uuidv4 } from 'uuid';
import SortableIngredient from '../SortableIngredient/SortableIngredient';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './BurgerConstructor.module.css';
import { useNavigate } from 'react-router-dom';

const BurgerConstructor: React.FC<{
  setIngredientCounts: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
}> = ({ setIngredientCounts }) => {
  const [modal, setModal] = React.useState(false);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { bun, ingredients } = useTypedSelector(
    (state) => state.BurgerConstructorReducer
  );
  const isAuthenticated = useTypedSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const { sendOrder } = useActions();

  // ref на div
  const listRef = React.useRef<HTMLDivElement>(null);

  // useDrop с корректной типизацией
  const [, drop] = useDrop({
    accept: 'Ingredient',
    drop(item: Idata) {
      const ingredientWithUuid: IConstructorIngredient = {
        ...item,
        uuid: uuidv4(),
      };
      dispatch({ type: UPDATE_TYPE, item: ingredientWithUuid });

      if (item.type !== 'bun') {
        setIngredientCounts((prev) => ({
          ...prev,
          [item._id]: (prev[item._id] || 0) + 1,
        }));
      }
    },
  });

  // соединяем drop и ref через useEffect
  React.useEffect(() => {
    if (listRef.current) {
      drop(listRef.current);
    }
  }, [drop]);

  const handleRemoveIngredient = (uuid: string, id: string) => {
    dispatch({ type: 'DELETE_INGREDIENT', uuid });
    setIngredientCounts((prev) => {
      const current = prev[id];
      if (!current || current <= 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const totalPrice = React.useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    return bunPrice + ingredients.reduce((sum, i) => sum + i.price, 0);
  }, [bun, ingredients]);

  return (
    <section className={styles.BurgerConstructor}>
      <div
        data-cy="burger-constructor"
        className={styles.ListBurgerWrapper}
        ref={listRef}
      >
        {/* Верхняя булка */}
        {bun ? (
          <ConstructorElement
            type="top"
            isLocked
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <div className={styles.placeholder}>
            Перетащите сюда булку для начала сборки 🍔
          </div>
        )}

        <div className={styles.ScrollableIngredients}>
          {ingredients.map(
            (ingredient: IConstructorIngredient, index: number) => (
              <SortableIngredient
                key={ingredient.uuid}
                ingredient={ingredient}
                index={index}
                onRemove={() =>
                  handleRemoveIngredient(ingredient.uuid, ingredient._id)
                }
              />
            )
          )}
        </div>

        {/* Нижняя булка */}
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>

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
            sendOrder([bun._id, ...ingredients.map((i) => i._id), bun._id]);
            setModal(true);
          }}
        >
          Оформить заказ
        </Button>
      </div>

      {modal && (
        <Modal onClick={() => setModal(false)}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
