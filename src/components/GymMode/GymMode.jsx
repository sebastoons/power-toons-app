import React from 'react';
import styles from './GymMode.module.css';

const GymMode = ({ onLibre, onRutina, onBack }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <button onClick={onBack} className={styles.backBtn}>❮</button>
      <h2 className={styles.headerTitle}>GYM</h2>
    </div>
    <div className={styles.body}>
      <p className={styles.sub}>¿Cómo quieres entrenar hoy?</p>

      <button className={styles.modeCard} onClick={onLibre}>
        <span className={styles.modeIcon}>🧍</span>
        <div className={styles.modeInfo}>
          <p className={styles.modeTitle}>LIBRE</p>
          <p className={styles.modeSub}>Explora el mapa corporal interactivo y busca ejercicios por zona muscular</p>
        </div>
        <span className={styles.modeArrow}>›</span>
      </button>

      <button className={styles.modeCard} onClick={onRutina}>
        <span className={styles.modeIcon}>📋</span>
        <div className={styles.modeInfo}>
          <p className={styles.modeTitle}>RUTINA</p>
          <p className={styles.modeSub}>Elige músculos, selecciona ejercicios y crea tu checklist de entrenamiento</p>
        </div>
        <span className={styles.modeArrow}>›</span>
      </button>
    </div>
  </div>
);

export default GymMode;
