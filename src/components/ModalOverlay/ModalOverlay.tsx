import React from 'react';
import styles from './ModalOverlay.module.css';

type ModalOverlayProps = {
  onClick: () => void;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClick }) => (
  <div
    className={styles.overlay}
    onClick={onClick}
    aria-label="Закрыть модалку"
  />
);

export default ModalOverlay;
