import React, { useState } from 'react';
import {
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../services/reducers/index';

const ProfilePage = () => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [activeLink, setActiveLink] = useState('Профиль');
  const navigate = useNavigate();
  const { logoutUser } = useActions();
  const { user } = useTypedSelector((state: RootState) => state.userReducer);

  function handleClick(
    e: React.MouseEvent<HTMLParagraphElement>,
    path: string
  ) {
    e.preventDefault();
    const linkText = e.currentTarget.textContent || '';

    setActiveLink(linkText);

    if (linkText === 'Выход') {
      try {
        logoutUser();
        navigate('/login', { replace: true });
      } catch (err) {
        console.error('Ошибка выхода:', err);
      }
    } else {
      navigate(path, { replace: true });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.containerLink}>
          <p
            className={`text text_type_digits-medium ${styles.link} ${
              activeLink === 'Профиль' ? '' : 'text_color_inactive'
            }`}
            onClick={(e) => handleClick(e, '/profile')}
          >
            Профиль
          </p>
          <p
            className={`text text_type_digits-medium ${styles.link} ${
              activeLink === 'История заказов' ? '' : 'text_color_inactive'
            }`}
            onClick={(e) => handleClick(e, '/profile/orders')}
          >
            История заказов
          </p>
          <p
            className={`text text_type_digits-medium ${styles.link} ${
              activeLink === 'Выход' ? '' : 'text_color_inactive'
            }`}
            onClick={(e) => handleClick(e, '/profile')}
          >
            Выход
          </p>
        </div>
        <div className={styles.containerInput}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
            value={user.name}
            name="firstName"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass="mt-6 mb-6"
          />
          <Input
            type="text"
            placeholder="Логин"
            onChange={(e) => setLogin(e.target.value)}
            value={user.email}
            name="login"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass="mt-6 mb-6"
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            extraClass="mt-6"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
