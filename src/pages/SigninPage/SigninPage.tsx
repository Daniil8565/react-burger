import React from 'react';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './SigninPage.module.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../services/reducers';
import { useActions } from '../../hooks/useAction';

const SigninPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [valueEmail, setValueEmail] = React.useState('');
  const [valuePassword, setValuePassword] = React.useState('');
  const { loginUser, fetchUser } = useActions();

  const { isLoading, error, isAuthenticated } = useTypedSelector(
    (state: RootState) => state.authReducer
  );

  const from = location.state?.from?.pathname || '/';

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, fetchUser]);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValueEmail(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValuePassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <form onSubmit={handleSubmit}>
          <EmailInput
            onChange={onChangeEmail}
            value={valueEmail}
            name="email"
            isIcon={false}
            extraClass="mb-6 mt-6"
          />
          <PasswordInput
            onChange={onChangePassword}
            value={valuePassword}
            name="password"
            extraClass="mb-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="small"
            extraClass={`${styles.button} ml-2`}
            disabled={isLoading}
          >
            Войти
          </Button>
        </form>

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
