import React, { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import { API_URL } from './constant';
import { Idata } from './constant';

function App() {
  const [state, setState] = useState<{
    data: Idata[] | null;
    loading: boolean;
    error: boolean;
  }>({
    data: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    setState({ ...state, loading: true, error: false });

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setState({ ...state, data: data.data, loading: false, error: false });
      })
      .catch(() => {
        setState({ ...state, loading: false, error: true });
      });
  }, []);

  if (state.loading) {
    return <p>Загрузка...</p>;
  }

  if (state.error) {
    return <p>Произошла ошибка при загрузке данных</p>;
  }

  return (
    <>
      <AppHeader />
      <main>
        <h2>Соберите бургер</h2>
        <div className="mainBurger">
          {state.data && <BurgerIngredients data={state.data} />}
          <BurgerConstructor />
        </div>
      </main>
    </>
  );
}

export default App;
