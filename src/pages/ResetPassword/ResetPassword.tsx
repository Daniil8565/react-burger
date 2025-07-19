import React from 'react';
import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.css';
import { request } from '../../utils/request'; // путь подкорректируй под свой проект

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async () => {
    try {
      await request('password-reset/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token }),
      });
      navigate('/login');
    } catch (err) {
      setError(
        'Ошибка при сбросе пароля. Проверьте данные и попробуйте снова.'
      );
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={`${styles.entrance} text text_type_main-medium`}>
          Восстановление пароля
        </p>

        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          extraClass="mt-6"
        />

        <Input
          type="text"
          placeholder="Код из письма"
          onChange={(e) => setToken(e.target.value)}
          value={token}
          name="token"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass="mt-6 mb-6"
        />

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass={`${styles.button} ml-2 mb-20`}
          onClick={handleSubmit}
        >
          Сохранить
        </Button>

        {error && (
          <p className="text text_type_main-default text_color_error">
            {error}
          </p>
        )}

        <div className={styles.containerLink}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
