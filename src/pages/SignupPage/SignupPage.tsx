import React from 'react';
import {
  PasswordInput,
  EmailInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignupPage.module.css';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../services/reducers';

const SignupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { registerUser, fetchUser } = useActions();
  const { isLoading, error, isAuthenticated } = useTypedSelector(
    (state: RootState) => state.authReducer
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email && password) {
      try {
        await registerUser(email, password, name);
        await fetchUser();
        navigate('/');
      } catch (err) {
        console.error('Ошибка при регистрации:', err);
      }
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
      navigate('/');
    }
  }, [isAuthenticated, navigate, fetchUser]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={`${styles.entrance} text text_type_main-medium`}>
          Регистрация
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="name"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass="mt-6"
          />
          <EmailInput
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            isIcon={false}
            extraClass="mb-6 mt-6"
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            extraClass="mb-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="small"
            extraClass={`${styles.button} ml-2 mb-20`}
            disabled={isLoading}
          >
            Зарегистрироваться
          </Button>
        </form>
        {error && (
          <p
            className={`text text_type_main-default text_color_error ${styles.error}`}
          >
            {error}
          </p>
        )}
        <div className={styles.containerLink}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
