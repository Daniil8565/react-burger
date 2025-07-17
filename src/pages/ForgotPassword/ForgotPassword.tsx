import React from 'react';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const [valueEmail, setValueEmail] = React.useState('');
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };

  const [valuePassword, setValuePassword] = React.useState('password');
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
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
      </div>
    </div>
  );
};

export default ForgotPassword;
