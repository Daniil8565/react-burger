import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  MenuIcon,
  BurgerIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './AppHeader.module.css';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={`pl-2 pr-2 pb-2 pt-2 ${styles.container}`}>
        <Link to="/" className={`pl-2 pr-2 pb-2 pt-2 ${styles.Designer}`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default">Конструктор</p>
        </Link>

        <Link to="/feed" className={`pl-2 pr-2 pb-2 pt-2 ${styles.OrderFeed}`}>
          <MenuIcon type="primary" />
          <p className="text text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </Link>

        <a className={`pl-2 pr-2 pb-2 pt-2 ${styles.logoWrapper}`}>
          <Logo />
        </a>

        <Link
          to="/profile"
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
