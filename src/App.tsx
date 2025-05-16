import { useEffect } from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import { getBurgerIngredients } from './services/actions/BurgerIngredients';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { useActions } from './hooks/useAction';

function App() {
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
  console.log(data);

  return (
    <>
      <AppHeader />
      <main>
        <h2 className="header">Соберите бургер</h2>
        <div className="mainBurger">
          {data && <BurgerIngredients data={data} />}
          <BurgerConstructor />
        </div>
      </main>
    </>
  );
}

export default App;
