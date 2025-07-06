import React, { useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { Idata } from '../../types/BurgerIngrediend';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { DraggableIngredient } from '../DraggableIngredient/DraggableIngredient';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const CATEGORIES = [
  { label: 'Булки', type: 'bun' },
  { label: 'Соусы', type: 'sauce' },
  { label: 'Начинки', type: 'main' },
];

type Category = (typeof CATEGORIES)[number]['type'];

type BurgerIngredientsProps = {
  ingredientCounts: Record<string, number>;
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

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({
  ingredientCounts,
}) => {
  const [currentTab, setCurrentTab] = React.useState('Булки');
  const bunRef = useRef<HTMLDivElement>(null!);
  const sauceRef = useRef<HTMLDivElement>(null!);
  const mainRef = useRef<HTMLDivElement>(null!);
  const [modal, setModal] = useState(false);
  const data = useTypedSelector(
    (state) => state.BurgerIngredientsReducers.data
  );

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
              {data!
                .filter((item) => item.type === cat.type)
                .map((item, idx) => (
                  <DraggableIngredient
                    key={item._id}
                    item={item}
                    count={ingredientCounts[item._id] || 0}
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
