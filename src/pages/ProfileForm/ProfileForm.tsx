import React, { useEffect, useState } from 'react';
import styles from './ProfileForm.module.css';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../services/reducers';
import { useActions } from '../../hooks/useAction';

const ProfileForm = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { user } = useTypedSelector((state: RootState) => state.userReducer);
  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: '' });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };
    setForm(newForm);
    setIsChanged(
      newForm.name !== user.name ||
        newForm.email !== user.email ||
        newForm.password !== ''
    );
  };

  const handleCancel = () => {
    setForm({ name: user.name, email: user.email, password: '' });
    setIsChanged(false);
  };

  const { updateUser } = useActions();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser(form.name, form.email, form.password || undefined);
    setIsChanged(false);
    setForm({ ...form, password: '' });
  };
  return (
    <div>
      <form className={styles.containerInput} onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleChange}
          value={form.name}
          name="name"
          error={false}
          size="default"
          extraClass="mt-6 mb-6"
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          name="email"
          error={false}
          size="default"
          extraClass="mt-6 mb-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={form.password}
          autoComplete="new-password"
          name="password"
          extraClass="mt-6 mb-6"
        />
        {isChanged && (
          <div className={styles.buttonGroup}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={handleCancel}
            >
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
