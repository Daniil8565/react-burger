import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { dataArray } from '../../utils/data';
import styles from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
  return (
    <div className={styles.BurgerConstructor}>
      <div className={styles.ListBurger}>
        {dataArray.map((item, index) => {
          return (
            <div className={styles.itemBurger} key={index}>
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <div className={styles.container__price}>
                {item.price}
                <CurrencyIcon type="primary" />
              </div>
              <LockIcon type="primary" />
            </div>
          );
        })}
      </div>
      <div className={styles.buttonAndPrice}>
        <div className={styles.priceAndIcon}>
          <p className="text text_type_main-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
