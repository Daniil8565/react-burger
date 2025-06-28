import React, { useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Idata } from '../../types/BurgerIngrediend';
import Modal from '../Modal/Modal';
import { useDrag } from 'react-dnd';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { DraggableIngredient } from '../DraggableIngredient/DraggableIngredient';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
// import {
//   setIngredientDetails,
//   clearIngredientDetails,
// } from '../../services/actions/IngredientDetails';

import {
  setIngredientDetails,
  clearIngredientDetails,
} from '../../types/IngredientDetails';

const CATEGORIES = [
  { label: 'Булки', type: 'bun' },
  { label: 'Соусы', type: 'sauce' },
  { label: 'Начинки', type: 'main' },
];

type Category = (typeof CATEGORIES)[number]['type'];

type BurgerIngredientsProps = {
  data: Idata[];
};

type TabSwitchProps = {
  current: string;
  onChange: (value: string) => void;
};

const TabSwitch: React.FC<TabSwitchProps> = ({ current, onChange }) => {
  return (
    <div className={styles.tab}>
      <Tab value="Булки" active={current === 'Булки'} onClick={onChange}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={onChange}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={onChange}>
        Начинки
      </Tab>
    </div>
  );
};

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ data }) => {
  const [currentTab, setCurrentTab] = React.useState('Булки');
  const bunRef = useRef<HTMLDivElement>(null!);
  const sauceRef = useRef<HTMLDivElement>(null!);
  const mainRef = useRef<HTMLDivElement>(null!);
  const [modal, setModal] = useState(false);

  const sectionRefs: Record<Category, React.RefObject<HTMLDivElement> | null> =
    {
      bun: bunRef,
      sauce: sauceRef,
      main: mainRef,
    };

  const handleTabClick = (label: string) => {
    setCurrentTab(label);
    const cat = CATEGORIES.find((c) => c.label === label);
    if (cat) {
      const ref = sectionRefs[cat.type];
      ref!.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // const [selectedItem, setSelectedItem] = useState<Idata | null>(null);
  const dispatch = useDispatch();
  const selectedItem = useTypedSelector(
    (state) => state.IngredientDetailsReducer.selectedIngredient
  );

  return (
    <section className={styles.container}>
      <TabSwitch current={currentTab} onChange={handleTabClick} />
      <div className={styles.content}>
        {CATEGORIES.map((cat, index) => (
          <div key={index} ref={sectionRefs[cat.type]}>
            <p className="text text_type_main-medium">{cat.label}</p>
            <div className={styles.ListBurger}>
              {data
                .filter((item) => item.type === cat.type)
                .map((item, idx) => (
                  <DraggableIngredient
                    key={item._id}
                    item={item}
                    onClick={() => {
                      dispatch({
                        type: 'SET_INGREDIENT_DETAILS',
                        payload: item,
                      });
                      setModal(true);
                    }}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      {modal && selectedItem && (
        <Modal
          onClick={() => {
            setModal(false);
            dispatch({ type: 'CLEAR_INGREDIENT_DETAILS' });
          }}
          header="Детали ингредиента"
        >
          <IngredientDetails item={selectedItem} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
