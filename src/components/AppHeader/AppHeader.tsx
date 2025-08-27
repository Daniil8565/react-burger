import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={`pl-2 pr-2 pb-2 pt-2 ${styles.container}`}>
        <a className={`pl-2 pr-2 pb-2 pt-2 ${styles.Designer}`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default">Конструктор</p>
        </a>

        <a className={`pl-2 pr-2 pb-2 pt-2 ${styles.OrderFeed}`}>
          <MenuIcon type="primary" />
          <p className="text text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </a>

        <a className={`pl-2 pr-2 pb-2 pt-2 ${styles.logoWrapper}`}>
          <Logo />
        </a>

        <Link
          to="profile"
          className={`pl-2 pr-2 pb-2 pt-2 ${styles.PersonalAccount}`}
        >
          <ProfileIcon type="primary" />
          <p className="text text_type_main-default text_color_inactive">
            Личный кабинет
          </p>
        </Link>
      </nav>
    </header>
  );
};

export default AppHeader;
