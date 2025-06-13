import React from 'react';
import Card from '../Shared/Card/Card';
import Button from '../Shared/Button/Button';
import styles from './ExerciseList.module.css';
import { exercises } from '../../data/exercisesData';

const ExerciseList = ({ muscleGroupId, onSelectExercise, onBack }) => {
  const selectedExercises = exercises[muscleGroupId] || [];

  return (
    <div className={styles.exerciseListContainer}>
      <div className={styles.buttonContainer}> {/* Nuevo contenedor para el botón */}
        <Button onClick={onBack}>Volver Atrás</Button>
      </div>
      <h2 className={styles.title}>EJERCICIOS DE {muscleGroupId.charAt(0).toUpperCase() + muscleGroupId.slice(1)}</h2>
      {selectedExercises.length === 0 ? (
        <p>NO HAY EJERCICIOS DISPONIBLES PARA ESTE GRUPO MUSCULAR.</p>
      ) : (
        <div className={styles.cardGrid}>
          {selectedExercises.map(exercise => (
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

export default ExerciseList;