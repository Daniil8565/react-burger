import { useEffect } from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useAction';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
function App() {
  const { data, loading, error } = useTypedSelector(
    (state) => state.BurgerIngredientsReducers
  );
  const { getBurgerIngredients } = useActions();
  const [ingredientCounts, setIngredientCounts] = useState<
    Record<string, number>
  >({});

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
    <>
      <AppHeader />
      <main>
        <h2 className="header">Соберите бургер</h2>
        <DndProvider backend={HTML5Backend}>
          <div className="mainBurger">
            <BurgerIngredients ingredientCounts={ingredientCounts} />
            <BurgerConstructor setIngredientCounts={setIngredientCounts} />
          </div>
        </DndProvider>
      </main>
    </>
  );
}

export default App;
