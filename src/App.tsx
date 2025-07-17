import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader/AppHeader';
import SigninPage from './pages/SigninPage/SigninPage';
import CustomBurger from './pages/CustomBurger/CustomBurger';
import SignupPage from './pages/SignupPage/SignupPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {
  return (
    <>
      <AppHeader />
      <Router>
        <Routes>
          <Route path="/login" element={<SigninPage />} />
          <Route path="/" element={<CustomBurger />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
