import React from 'react';
import Card from '../Shared/Card/Card';
import styles from './Nutrition.module.css';

const Nutrition = ({ onSelectOption, onBack }) => {
  return (
    <div className={styles.nutritionContainer}>
      <div className={styles.modernHeader}>
        <button onClick={onBack} className={styles.backArrowBtn}>❮</button>
        <h2 className={styles.headerTitle}>NUTRICIÓN</h2>
      </div>

      <h2 className={styles.title}>TU GUÍA ALIMENTARIA</h2>
      
      <div className={styles.cardGrid}>
        <Card
          title="PIRÁMIDE ALIMENTICIA 2026"
          image="/img/nutrition/piramide_alimenticia.jpg"
          onClick={() => onSelectOption('foodPyramid')}
        />
        <Card
          title="IA NUTRICIONAL"
          image="/img/nutrition/ai_nutrition.jpg"
          onClick={() => onSelectOption('aiNutrition')}
        />
      </div>
    </div>
  );
};

export default Nutrition;