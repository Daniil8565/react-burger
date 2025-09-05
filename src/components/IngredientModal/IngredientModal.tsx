import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const IngredientModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const ingredients = useTypedSelector(
    (state) => state.BurgerIngredientsReducers.data
  );
  const loading = useTypedSelector(
    (state) => state.BurgerIngredientsReducers.loading
  );

  const ingredient = ingredients!.find((item) => item._id === id);

  return (
    <Modal
      onClick={() => {
        navigate(-1);
        dispatch({ type: 'CLEAR_INGREDIENT_DETAILS' });
      }}
      header="Детали ингредиента"
    >
      {loading ? (
        <p>Загрузка ингредиента...</p>
      ) : ingredient ? (
        <IngredientDetails item={ingredient} />
      ) : (
        <p>Ингредиент не найден</p>
      )}
    </Modal>
  );
};

export default IngredientModal;
