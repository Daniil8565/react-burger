import React from 'react';
import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';
import { RootState } from '../../services/reducers';

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const { resetPassword } = useActions();

  const { isLoading, error, success } = useTypedSelector(
    (state: RootState) => state.resetPasswordReducer
  );

  React.useEffect(() => {
    if (success) {
      navigate('/login');
    }
  }, [success, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword(password, token);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={`${styles.entrance} text text_type_main-medium`}>
          Восстановление пароля
        </p>

        <form onSubmit={handleSubmit}>
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            extraClass="mt-6"
            disabled={isLoading}
          />

          <Input
            type="text"
            placeholder="Код из письма"
            onChange={(e) => setToken(e.target.value)}
            value={token}
            name="token"
            error={!!error}
            errorText="Ошибка"
            size="default"
            extraClass="mt-6 mb-6"
            disabled={isLoading}
          />

          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={`${styles.button} ml-2 mb-20`}
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Сохранить'}
          </Button>
        </form>

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
