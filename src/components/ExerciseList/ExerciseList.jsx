// src/components/ExerciseList/ExerciseList.jsx

import React, { useState, useEffect } from 'react';
import Card from '../Shared/Card/Card';
import styles from './ExerciseList.module.css';
import { muscleGroups } from '../../data/exercisesData';
import { fetchExercisesByMuscle } from '../../services/exerciseApi'; 

const ExerciseList = ({ muscleGroupId, onSelectExercise, onBack }) => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  
  const muscleGroup = muscleGroups.find(group => group.id === muscleGroupId);
  const title = muscleGroup ? muscleGroup.name : 'EJERCICIOS';

  useEffect(() => {
    const loadExercises = async () => {
      setIsLoading(true); 
      const data = await fetchExercisesByMuscle(muscleGroupId);
      setExercises(data);
      setIsLoading(false); 
    };

    loadExercises();
  }, [muscleGroupId]);

  return (
    <div className={styles.exerciseListContainer}>
      
      {/* 💥 NUEVO HEADER MODERNO EN UNA SOLA LÍNEA 💥 */}
      <div className={styles.modernHeader}>
        <button onClick={onBack} className={styles.backArrowBtn}>
          ❮
        </button>
        <h2 className={styles.headerTitle}>{title}</h2>
      </div>
      
      {isLoading ? (
        // 💥 ANIMACIÓN DE MANCUERNA GIRANDO 💥
        <div className={styles.loadingContainer}>
          <div className={styles.spinningDumbbell}>🏋️‍♂️</div>
        </div>
      ) : exercises.length > 0 ? (
        <div className={styles.cardGrid}>
          {exercises.map(exercise => (
            <Card
              key={exercise.id}
              title={exercise.name}
              image={exercise.image || exercise.gif} 
              onClick={() => onSelectExercise(exercise)}
              isSmallText={true} // 👈 Activamos la letra pequeña para esta lista
            />
          ))}
        </div>
      ) : (
        <p style={{textAlign: 'center', color: '#fff'}}>No se encontraron ejercicios para este grupo muscular.</p>
      )}
    </div>
  );
};

export default ExerciseList;