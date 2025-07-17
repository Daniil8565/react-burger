import React from 'react';
import {
  PasswordInput,
  EmailInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './ResetPassword.module.css';

const ResetPassword = () => {
  const [valueEmail, setValueEmail] = React.useState('bob@example.com');
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };

  const [valuePassword, setValuePassword] = React.useState('password');
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
  };

  const [value, setValue] = React.useState('value');
  const inputRef = React.useRef(null);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={`${styles.entrance} text text_type_main-medium`}>
          Восстановление пароля
        </p>
        <PasswordInput
          onChange={onChangePassword}
          value={valuePassword}
          name={'password'}
          extraClass="mt-6"
        />
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mt-6 mb-6"
        />
        <Button
          htmlType="button"
          type="primary"
          size="small"
          extraClass={`${styles.button} ml-2 mb-20`}
        >
          Созранить
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

export default ResetPassword;
