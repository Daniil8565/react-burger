import React from 'react';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './SigninPage.module.css';

const SigninPage = () => {
  const [valueEmail, setValueEmail] = React.useState('bob@example.com');
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
        <p className={`${styles.entrance} text text_type_main-medium`}>Вход</p>
        <EmailInput
          onChange={onChangeEmail}
          value={valueEmail}
          name={'email'}
          isIcon={false}
          extraClass="mb-6 mt-6"
        />
        <PasswordInput
          onChange={onChangePassword}
          value={valuePassword}
          name={'password'}
          extraClass="mb-6"
        />
        <Button
          htmlType="button"
          type="primary"
          size="small"
          extraClass={`${styles.button} ml-2`}
        >
          Войти
        </Button>
        <div className={styles.containerLink}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>
        <div className={styles.containerLink}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
