import React from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <h2>Соберите бургер</h2>
        <div className="mainBurger">
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    </>
  );
}

export default App;
