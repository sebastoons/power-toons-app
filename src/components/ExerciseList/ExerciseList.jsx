// src/components/ExerciseList/ExerciseList.jsx

import React, { useState, useEffect } from 'react';
import Card from '../Shared/Card/Card';
import Button from '../Shared/Button/Button';
import styles from './ExerciseList.module.css';
import { muscleGroups } from '../../data/exercisesData';
import { fetchExercisesByMuscle } from '../../services/exerciseApi'; // Importamos nuestro nuevo servicio

const ExerciseList = ({ muscleGroupId, onSelectExercise, onBack }) => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  
  const muscleGroup = muscleGroups.find(group => group.id === muscleGroupId);
  const title = muscleGroup ? muscleGroup.name : 'EJERCICIOS';

  useEffect(() => {
    // Función asíncrona para buscar los datos cuando se abre la pantalla
    const loadExercises = async () => {
      setIsLoading(true); // Iniciamos el modo "Cargando"
      
      // Llamamos a nuestra API
      const data = await fetchExercisesByMuscle(muscleGroupId);
      
      setExercises(data);
      setIsLoading(false); // Terminamos de cargar
    };

    loadExercises();
  }, [muscleGroupId]);

  return (
    <div className={styles.exerciseListContainer}>
      <div className={styles.buttonContainer}>
        <Button onClick={onBack}>Volver Atrás</Button>
      </div>
      <h2 className={styles.title}>{title}</h2>
      
      {isLoading ? (
        // Muestra un mensaje o un "Spinner" mientras baja los datos de internet
        <div className={styles.loadingContainer}>
          <h3 style={{ color: '#001ba3' }}>Cargando ejercicios desde la base de datos... 🏋️‍♂️</h3>
        </div>
      ) : exercises.length > 0 ? (
        <div className={styles.cardGrid}>
          {exercises.map(exercise => (
            <Card
              key={exercise.id}
              title={exercise.name}
              image={exercise.image || exercise.gif} // Si no hay imagen, usa el gif para la portada
              onClick={() => onSelectExercise(exercise)}
            />
          ))}
        </div>
      ) : (
        <p>No se encontraron ejercicios para este grupo muscular.</p>
      )}
    </div>
  );
};

export default ExerciseList;