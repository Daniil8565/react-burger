import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { dataArray } from '../../utils/data';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const TabSwitch = () => {
  const [current, setCurrent] = React.useState('Булки');
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};

const BurgerIngredients = () => {
  return (
    <div className={styles.container}>
      <h2>Соберите бургер</h2>
      <TabSwitch />
      {dataArray.map((item, index) => {
        return (
          <div>
            <img src={item.image} alt="" />
            <h3>{item.name}</h3>
            <Counter count={index + 1} size="default" extraClass="m-1" />
            <p>{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
        );
      })}
    </div>
  );
};

export default BurgerIngredients;
