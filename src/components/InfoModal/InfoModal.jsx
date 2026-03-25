// src/components/InfoModal/InfoModal.jsx

import React from 'react';
import Button from '../Shared/Button/Button';
import styles from './InfoModal.module.css';

const InfoModal = ({ message, onClose }) => {
  return (
    // La capa de fondo oscuro. Si haces clic aquí, el modal se cierra.
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* El contenido blanco del modal. Paramos la propagación del clic para que no se cierre si haces clic aquí. */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Información</h2>
        </div>
        <div className={styles.modalBody}>
          <p className={styles.messageText}>{message}</p>
        </div>
        <div className={styles.modalFooter}>
          {/* El botón de 'Aceptar', igual que en tu alert */}
          <Button onClick={onClose} variant="primary">Aceptar</Button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;