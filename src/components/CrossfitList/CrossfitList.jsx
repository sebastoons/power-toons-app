// src/components/CrossfitList/CrossfitList.jsx

import React from 'react';
import Card from '../Shared/Card/Card'; // Ajusta la ruta si es necesario (es la correcta: ../Shared/Card/Card)
import Button from '../Shared/Button/Button'; // Ajusta la ruta si es necesario (es la correcta: ../Shared/Button/Button)
import styles from './CrossfitList.module.css'; // Usaremos un CSS específico para CrossfitList
import { crossfitExercises } from '../../data/crossfitExercises'; // ¡Importa los datos de Crossfit!

const CrossfitList = ({ onSelectExercise, onBack }) => {
  // Ordenar los ejercicios de Crossfit alfabéticamente por nombre
  const sortedCrossfitExercises = [...crossfitExercises].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className={styles.crossfitListContainer}>
      <div className={styles.buttonContainer}>
        <Button onClick={onBack}>Volver Atrás</Button>
      </div>
      <h2 className={styles.title}>Ejercicios de Crossfit</h2>
      {sortedCrossfitExercises.length === 0 ? (
        <p>No hay ejercicios disponibles para Crossfit.</p>
      ) : (
        <div className={styles.cardGrid}>
          {sortedCrossfitExercises.map(exercise => (
            <Card
              key={exercise.id}
              title={exercise.name}
              image={exercise.image}
              onClick={() => onSelectExercise(exercise)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CrossfitList;