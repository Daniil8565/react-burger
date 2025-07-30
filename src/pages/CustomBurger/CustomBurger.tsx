import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';

const CustomBurger = () => {
  const [ingredientCounts, setIngredientCounts] = useState<
    Record<string, number>
  >({});

  const { data, loading, error } = useTypedSelector(
    (state) => state.BurgerIngredientsReducers
  );
  const { getBurgerIngredients } = useActions();

  useEffect(() => {
    getBurgerIngredients();
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Произошла ошибка при загрузке данных</p>;
  }

  return (
    <div>
      <h2 className="header">Соберите бургер</h2>
      <DndProvider backend={HTML5Backend}>
        <div className="mainBurger">
          <BurgerIngredients ingredientCounts={ingredientCounts} />
          <BurgerConstructor setIngredientCounts={setIngredientCounts} />
        </div>
      </DndProvider>
    </div>
  );
};

export default CustomBurger;
