import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { useActions } from '../../hooks/useAction';

const IngredientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { getBurgerIngredients } = useActions();

  const ingredients = useTypedSelector(
    (state) => state.BurgerIngredientsReducers.data
  );
  const loading = useTypedSelector(
    (state) => state.BurgerIngredientsReducers.loading
  );
  const error = useTypedSelector(
    (state) => state.BurgerIngredientsReducers.error
  );

  useEffect(() => {
    if (!ingredients || ingredients.length === 0) {
      getBurgerIngredients();
    }
  }, [dispatch, ingredients]);

  if (loading) {
    return <p>Загрузка ингредиентов...</p>;
  }

  if (error) {
    return <p>Ошибка при загрузке: {error}</p>;
  }

  const ingredient = ingredients?.find((item) => item._id === id);

  if (!ingredient) {
    return <p>Ингредиент не найден</p>;
  }

  return (
    <main style={{ padding: 20 }}>
      <IngredientDetails item={ingredient} />
    </main>
  );
};

export default IngredientPage;
