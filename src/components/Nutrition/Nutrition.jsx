import React from 'react';
import styles from './Nutrition.module.css';

const Nutrition = ({ onSelectOption, onBack }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>❮</button>
        <h2 className={styles.headerTitle}>NUTRICIÓN</h2>
      </div>
      <div className={styles.hero} onClick={() => onSelectOption('aiNutrition')}>
        <span className={styles.heroIcon}>🥗</span>
        <div className={styles.heroInfo}>
          <p className={styles.heroTitle}>ASESOR NUTRICIONAL IA</p>
          <p className={styles.heroSub}>Calcula tus macros · Plan de comidas personalizado · Recomendación por tiempo de comida</p>
        </div>
        <span className={styles.heroArrow}>›</span>
      </div>
    </div>
  );
};

export default Nutrition;
