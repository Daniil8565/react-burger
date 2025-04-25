import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Idata } from '../../constant';

type BurgerIngredientsProps = {
  data: Idata[];
};

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

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <TabSwitch />
      <div className={styles.ListBurger}>
        {data.map((item, index) => {
          return (
            <div key={index} className={styles.BurgerItem}>
              <img src={item.image} alt="" />
              <div className={styles.container__price}>
                <p>{item.price}</p>
                <CurrencyIcon type="primary" />
              </div>
              <p>{item.name}</p>
              <Counter count={index + 1} size="default" extraClass="m-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BurgerIngredients;
