import React from 'react';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SigninPage.module.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../services/reducers/index';
import { useActions } from '../../hooks/useAction';

const SigninPage = () => {
  const navigate = useNavigate();

  const [valueEmail, setValueEmail] = React.useState('bob@example.com');
  const [valuePassword, setValuePassword] = React.useState('password');
  const { loginUser, fetchUser } = useActions();

  const { isLoading, error, isAuthenticated } = useTypedSelector(
    (state: RootState) => state.authReducer
  );

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValueEmail(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValuePassword(e.target.value);

  const onLoginClick = async () => {
    try {
      await loginUser(valueEmail, valuePassword);
      await fetchUser();
    } catch (err) {
      console.error('Ошибка при входе или получении пользователя:', err);
    }
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
          onClick={onLoginClick}
          disabled={isLoading}
        >
          Войти
        </Button>

        {error && (
          <p
            className={`text text_type_main-default text_color_error mt-4 ${styles.errorLogin}`}
          >
            {error}
          </p>
        )}

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
