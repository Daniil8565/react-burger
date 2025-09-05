import React, { useState } from 'react';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ForgotPassword.module.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';

const ForgotPassword = () => {
  const [valueEmail, setValueEmail] = useState('');
  const navigate = useNavigate();
  const { sendForgotEmail } = useActions();

  const { success, error, isLoading } = useTypedSelector(
    (state: any) => state.forgotPasswordReducer
  );

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendForgotEmail(valueEmail);

    if (success) {
      navigate('/reset-password');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={`${styles.entrance} text text_type_main-medium`}>
          Восстановление пароля
        </p>

        <form onSubmit={handleSubmit}>
          <EmailInput
            onChange={onChangeEmail}
            value={valueEmail}
            placeholder="Укажите e-mail"
            name="email"
            extraClass="mb-6 mt-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="small"
            extraClass={`${styles.button} mb-20`}
            disabled={isLoading}
          >
            Восстановить
          </Button>
        </form>

        <div className={styles.containerLink}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </div>

        {error && (
          <p className="text text_type_main-default text_color_error">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
