import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AppHeader from './components/AppHeader/AppHeader';
import SigninPage from './pages/SigninPage/SigninPage';
import CustomBurger from './pages/CustomBurger/CustomBurger';
import SignupPage from './pages/SignupPage/SignupPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { useTypedSelector } from './hooks/useTypedSelector';
import ProtectedRouteElement from './components/ProtectedRouteElement/ProtectedRouteElement';
import { RootState } from './services/reducers/index';

function App() {
  const success = useTypedSelector(
    (state: RootState) => state.forgotPasswordReducer.success
  );

  return (
    <Router>
      <AppHeader />
      <Routes>
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
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
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

        {/* Защищённый маршрут */}
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement>
              <ProfilePage />
            </ProtectedRouteElement>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
