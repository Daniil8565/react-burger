import React, { ReactNode, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';

const modalRoot = document.getElementById('react-modals') as HTMLElement;

type ModalProps = {
  children: ReactNode;
  onClick: () => void;
  header?: string;
};

const Modal: React.FC<ModalProps> = ({ children, onClick, header = '' }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClick();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClick]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClick} />
      <aside className={styles.modal}>
        <header className={styles.modalHeader}>
          <h2 className="text text_type_digits-medium">{header}</h2>
          <div
            className={styles.modalClose}
            onClick={onClick}
            data-testid="closeIcon"
          >
            <CloseIcon type="primary" />
          </div>
        </header>
        {children}
      </aside>
    </>,
    modalRoot
  );
};

export default Modal;
