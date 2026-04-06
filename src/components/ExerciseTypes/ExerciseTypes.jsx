import React from 'react';
import Card from '../Shared/Card/Card';
import Button from '../Shared/Button/Button';
import styles from './ExerciseTypes.module.css';
import { exerciseTypes } from '../../data/exercisesData';

const ExerciseTypes = ({ onSelectType, onBack }) => {
  return (
    <div className={styles.exerciseTypesContainer}>
      <div className={styles.modernHeader}>
        <button onClick={onBack} className={styles.backArrowBtn}>❮</button>
        <h2 className={styles.headerTitle}>SELECCIONA TU ENTRENAMIENTO</h2>
      </div>
      <h2 className={styles.title}>TIPOS DE EJERCICIOS</h2>
      <div className={styles.cardGrid}>
        {exerciseTypes.map(type => (
          <Card
            key={type.id}
            title={type.name}
            image={type.image}
            onClick={() => onSelectType(type.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExerciseTypes;