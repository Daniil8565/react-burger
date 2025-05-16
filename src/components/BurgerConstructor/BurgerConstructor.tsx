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
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import OrderDetails from '../OrderDetails/OrderDetails';

const BurgerConstructor = () => {
  const [modal, setModal] = React.useState(false);
  return (
    <section className={styles.BurgerConstructor}>
      <div className={styles.ListBurgerWrapper}>
        <div className={styles.Bun}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={Logo}
          />
        </div>

        <div className={styles.ScrollableIngredients}>
          {dataArray.map((item, index) => {
            return (
              <div key={index} className={styles.burgerList}>
                <div className={styles.burgerItem}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    isLocked={item.type === 'bun' ? true : false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.Bun}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={Logo}
          />
        </div>
      </div>
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
      {modal && (
        <Modal onClick={() => setModal(false)}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
