import React, { ReactNode } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.getElementById('react-modals') as HTMLElement;

type ModalProps = {
  children: ReactNode;
  onClick: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClick }) => {
  return ReactDOM.createPortal(
    <aside className={styles.modal}>
      <header className={styles.modalHeader}>
        <div className={styles.modalClose} onClick={onClick}>
          <CloseIcon type="primary" />
        </div>
      </header>
      {children}
    </aside>,
    modalRoot
  );
};

export default Modal;
