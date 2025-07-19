import React, { useState } from 'react';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { request } from '../../utils/request'; // путь поправь под свою структуру
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const [valueEmail, setValueEmail] = React.useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await request('password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: valueEmail }),
      });

      navigate('/reset-password');
    } catch (err) {
      setError(`Ошибка: ${err}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={`${styles.entrance} text text_type_main-medium`}>
          Восстановление пароля
        </p>
        <EmailInput
          onChange={onChangeEmail}
          value={valueEmail}
          placeholder="Укажите e-mail"
          name={'email'}
          extraClass="mb-6 mt-6"
        />
        <Button
          htmlType="button"
          type="primary"
          size="small"
          extraClass={`${styles.button} mb-20`}
          onClick={handleSubmit}
        >
          Восстановить
        </Button>
        <div className={styles.containerLink}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
