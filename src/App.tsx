import React from 'react';
import './App.css';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Location,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AppHeader from './components/AppHeader/AppHeader';
import SigninPage from './pages/SigninPage/SigninPage';
import CustomBurger from './pages/CustomBurger/CustomBurger';
import SignupPage from './pages/SignupPage/SignupPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import IngredientPage from './pages/IngredientPage/IngredientPage';
import Modal from './components/Modal/Modal';
import IngredientDetails from './components/IngredientDetails/IngredientDetails';
import Feed from './pages/feedPage/Feed';

import { useTypedSelector } from './hooks/useTypedSelector';
import ProtectedRouteElement from './components/ProtectedRouteElement/ProtectedRouteElement';
import { RootState } from './services/reducers/index';
import OrderPage from './pages/OrderPage/OrderPage';
import ProfileForm from './pages/ProfileForm/ProfileForm';
import OrdersPage from './pages/OrdersPage/OrdersPage';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const success = useTypedSelector(
    (state: RootState) => state.forgotPasswordReducer.success
  );
  const selectedItem = useTypedSelector(
    (state: RootState) => state.IngredientDetailsReducer.selectedIngredient
  );

  // Приводим тип location.state к объекту с возможным полем background (если есть)
  const state = location.state as { background?: Location };

  return (
    <>
      <AppHeader />
      <Routes location={state?.background || location}>
        {/* Публичный маршрут */}
        <Route path="/" element={<CustomBurger />} />

        {/* Только для НЕавторизованных */}
        <Route
          path="/login"
          element={
            <ProtectedRouteElement onlyUnAuth>
              <SigninPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement onlyUnAuth>
              <SignupPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement onlyUnAuth>
              <ForgotPassword />
            </ProtectedRouteElement>
          }
        />
        <Route path="/feed/:id" element={<OrderPage />} />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement onlyUnAuth>
              {success ? (
                <ResetPassword />
              ) : (
                <Navigate to="/forgot-password" replace />
              )}
            </ProtectedRouteElement>
          }
        />
        <Route path="/feed" element={<Feed />} />

        {/* Защищённый маршрут */}
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement>
              <ProfilePage />
            </ProtectedRouteElement>
          }
        >
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<OrdersPage />} />
          {/* /profile/orders */}
        </Route>
        <Route path="/ingredients/:id" element={<IngredientPage />} />
      </Routes>

      {/* Модалка поверх главной страницы */}
      {state?.background && selectedItem && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                onClick={() => {
                  navigate(-1);
                  dispatch({ type: 'CLEAR_INGREDIENT_DETAILS' });
                }}
                header="Детали ингредиента"
              >
                <IngredientDetails item={selectedItem} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
