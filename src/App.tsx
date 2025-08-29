import React, { useEffect } from 'react';
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
import Feed from './pages/feedPage/Feed';

import { useTypedSelector } from './hooks/useTypedSelector';
import ProtectedRouteElement from './components/ProtectedRouteElement/ProtectedRouteElement';
import { RootState } from './services/reducers/index';
import OrderPage from './pages/OrderPage/OrderPage';
import ProfileForm from './pages/ProfileForm/ProfileForm';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage/OrderDetailsPage';
import { refreshAccessToken } from './services/actions/authActions';
import IngredientModal from './components/IngredientModal/IngredientModal';

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

  // для модалок
  const state = location.state as { background?: Location };
  const isAuthChecked = useTypedSelector(
    (state: RootState) => state.authReducer.isAuthChecked
  );
  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      dispatch(refreshAccessToken() as any);
    } else {
      // Если нет refreshToken, всё равно отмечаем, что проверка завершена
      dispatch({ type: 'NO_AUTH_CHECK_NEEDED' });
    }
  }, [dispatch]);

  if (!isAuthChecked) {
    // Можно показать лоадер
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <AppHeader />

      {/* обычные маршруты */}
      <Routes location={state?.background || location}>
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

        {/* Лента заказов */}
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:id" element={<OrderPage />} />

        {/* Профиль */}
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
        </Route>
        <Route
          path="/profile/orders/:id"
          element={
            <ProtectedRouteElement>
              <OrderDetailsPage />
            </ProtectedRouteElement>
          }
        />

        {/* ингредиенты */}
        <Route path="/ingredients/:id" element={<IngredientPage />} />
      </Routes>

      {/* модальные окна */}
      {state?.background && (
        <Routes>
          {/* <Route
            path="/ingredients/:id"
            element={
              <Modal
                onClick={() => {
                  navigate(-1);
                  dispatch({ type: 'CLEAR_INGREDIENT_DETAILS' });
                }}
                header="Детали ингредиента"
              >
                {selectedItem && <IngredientDetails item={selectedItem} />}
              </Modal>
            }
          /> */}
          <Route path="/ingredients/:id" element={<IngredientModal />} />

          <Route
            path="/feed/:id"
            element={
              <Modal onClick={() => navigate(-1)} header="Детали заказа">
                <OrderPage />
              </Modal>
            }
          />

          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClick={() => navigate(-1)} header="Детали заказа">
                <OrderDetailsPage />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
