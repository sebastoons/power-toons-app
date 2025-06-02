import React from 'react';
import Card from '../Shared/Card/Card';
import Button from '../Shared/Button/Button';
import styles from './ExerciseTypes.module.css';
import { exerciseTypes } from '../../data/exercisesData';

const ExerciseTypes = ({ onSelectType, onBack }) => {
  return (
    <div className={styles.exerciseTypesContainer}>
      <Button onClick={onBack}>Volver Atrás</Button>
      <h2 className={styles.title}>Tipos de Ejercicios</h2>
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