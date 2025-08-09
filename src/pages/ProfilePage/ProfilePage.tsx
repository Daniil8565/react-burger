import React, { useEffect, useState } from 'react';
import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../services/reducers';

const ProfilePage = () => {
  const [activeLink, setActiveLink] = useState('Профиль');
  const navigate = useNavigate();
  const { logoutUser, updateUser } = useActions();
  const { user } = useTypedSelector((state: RootState) => state.userReducer);
  const [isChanged, setIsChanged] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        password: '',
      });
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

  const handleNavClick = async (
    e: React.MouseEvent<HTMLParagraphElement>,
    path: string
  ) => {
    e.preventDefault();
    const linkText = e.currentTarget.textContent || '';

    setActiveLink(linkText);

    if (linkText === 'Выход') {
      try {
        await logoutUser();
        navigate('/login', { replace: true });
      } catch (err) {
        console.error('Ошибка выхода:', err);
      }
    } else {
      navigate(path, { replace: true });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser(form.name, form.email, form.password || undefined);
    setIsChanged(false);
    setForm({ ...form, password: '' });
  };

  const handleCancel = () => {
    setForm({
      name: user.name,
      email: user.email,
      password: '',
    });
    setIsChanged(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.containerLink}>
          <p
            className={`text text_type_digits-medium ${styles.link} ${
              activeLink === 'Профиль' ? '' : 'text_color_inactive'
            }`}
            onClick={(e) => handleNavClick(e, '/profile')}
          >
            Профиль
          </p>
          <p
            className={`text text_type_digits-medium ${styles.link} ${
              activeLink === 'История заказов' ? '' : 'text_color_inactive'
            }`}
            onClick={(e) => handleNavClick(e, '/profile/orders')}
          >
            История заказов
          </p>
          <p
            className={`text text_type_digits-medium ${styles.link} ${
              activeLink === 'Выход' ? '' : 'text_color_inactive'
            }`}
            onClick={(e) => handleNavClick(e, '/profile')}
          >
            Выход
          </p>
        </div>

        {/* форма с onSubmit */}
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
    </div>
  );
};

export default ProfilePage;
