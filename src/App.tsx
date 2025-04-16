import React from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <BurgerIngredients />
      </main>
    </>
  );
}

export default App;
