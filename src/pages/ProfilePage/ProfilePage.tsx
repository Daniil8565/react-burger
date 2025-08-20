// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../services/reducers';

const ProfilePage = () => {
  const [activeLink, setActiveLink] = useState('Профиль');
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutUser, updateUser } = useActions();
  const { user } = useTypedSelector((state: RootState) => state.userReducer);
  const [isChanged, setIsChanged] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        password: '',
      });
    }
  }, [user]);

  // Обновляем активную ссылку при смене маршрута
  useEffect(() => {
    if (location.pathname === '/profile') setActiveLink('Профиль');
    else if (location.pathname === '/profile/orders')
      setActiveLink('История заказов');
  }, [location.pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };
    setForm(newForm);
    setIsChanged(
      newForm.name !== user.name ||
        newForm.email !== user.email ||
        newForm.password !== ''
    );
  };

  const handleNavClick = async (linkText: string, path?: string) => {
    if (linkText === 'Выход') {
      await logoutUser();
      navigate('/login', { replace: true });
    } else if (path) {
      navigate(path);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser(form.name, form.email, form.password || undefined);
    setIsChanged(false);
    setForm({ ...form, password: '' });
  };

  const handleCancel = () => {
    setForm({ name: user.name, email: user.email, password: '' });
    setIsChanged(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.containerLink}>
          <p
            className={`text text_type_digits-medium ${styles.link} ${
              activeLink === 'Профиль' ? '' : 'text_color_inactive'
            }`}
            onClick={() => handleNavClick('Профиль', '/profile')}
          >
            Профиль
          </p>
          <p
            className={`text text_type_digits-medium ${styles.link} ${
              activeLink === 'История заказов' ? '' : 'text_color_inactive'
            }`}
            onClick={() => handleNavClick('История заказов', '/profile/orders')}
          >
            История заказов
          </p>
          <p
            className={`text text_type_digits-medium ${styles.link} ${
              activeLink === 'Выход' ? '' : 'text_color_inactive'
            }`}
            onClick={() => handleNavClick('Выход')}
          >
            Выход
          </p>
        </div>

        {/* Контент справа */}
        <div className={styles.containerInput}>
          <Outlet /> {/* Здесь будут рендериться ProfileForm или OrdersPage */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
