// src/components/ExerciseModal/ExerciseModal.jsx

import React, { useState, useEffect } from 'react';
import Button from '../Shared/Button/Button';
import styles from './ExerciseModal.module.css';

const ExerciseModal = ({ exercise, onClose }) => {
  // Estado para el ejercicio que se está mostrando actualmente en el modal.
  // Inicialmente es el ejercicio principal que se pasó por props.
  const [currentDisplayExercise, setCurrentDisplayExercise] = useState(exercise);

  const [week, setWeek] = useState('');
  const [kgLb, setKgLb] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');

  // Clave única para localStorage para el ejercicio *actualmente visible*
  // Esto asegura que cada variante (y el ejercicio principal) tenga su propio progreso.
  const localStorageKey = `exerciseData-${currentDisplayExercise.id}`;

  // Cargar datos al montar el modal o cuando cambia el ejercicio a mostrar (incluyendo variantes)
  useEffect(() => {
    // Restablece los campos al cambiar de ejercicio (o variante)
    setWeek('');
    setKgLb('');
    setReps('');
    setSets('');

    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setWeek(parsedData.week || '');
        setKgLb(parsedData.kgLb || '');
        setReps(parsedData.reps || '');
        setSets(parsedData.sets || '');
      } catch (error) {
        console.error("Error al parsear datos de localStorage:", error);
        localStorage.removeItem(localStorageKey); // Limpiar datos corruptos
      }
    }
  }, [currentDisplayExercise.id, localStorageKey]); // Dependencia clave: currentDisplayExercise.id

  // Guardar datos cada vez que cambian los estados de los campos de progreso
  useEffect(() => {
    const dataToSave = { week, kgLb, reps, sets };
    localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
  }, [week, kgLb, reps, sets, localStorageKey]);

  // Restablece el ejercicio mostrado en el modal cuando la prop 'exercise' cambia desde fuera.
  // Esto es importante si el modal se reutiliza o se abre con un ejercicio diferente.
  useEffect(() => {
    setCurrentDisplayExercise(exercise);
  }, [exercise]);


  const handleResetFields = () => {
    setWeek('');
    setKgLb('');
    setReps('');
    setSets('');
    localStorage.removeItem(localStorageKey); // Eliminar también del localStorage para el ejercicio actual
  };

  // Función para cambiar al contenido de una variante
  const handleSelectVariant = (variant) => {
    setCurrentDisplayExercise(variant);
  };

  // Función para volver al ejercicio principal
  const handleBackToMainExercise = () => {
    setCurrentDisplayExercise(exercise);
  };

  if (!exercise) return null; // Si no hay ejercicio, no renderizar el modal

  // Determinar si el ejercicio actual en display es una variante del ejercicio principal
  const isVariantCurrentlyDisplayed = currentDisplayExercise.id !== exercise.id;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          {/* Mostrar el nombre del ejercicio principal o de la variante */}
          <h2 className={styles.modalTitle}>{currentDisplayExercise.name}</h2>
          <Button onClick={onClose} variant="secondary">X</Button> {/* Botón de cerrar */}
        </div>

        <div className={styles.modalBody}>
          {/* Sección de Variantes (solo si hay variantes y no estamos ya viendo una variante del mismo ejercicio) */}
          {exercise.variants && exercise.variants.length > 0 && !isVariantCurrentlyDisplayed && (
            <div className={styles.variantsSection}>
              <h3>VARIANTES:</h3>
              <div className={styles.variantLinks}>
                {exercise.variants.map((variant) => (
                  <Button
                    key={variant.id}
                    onClick={() => handleSelectVariant(variant)}
                    variant="link" // Puedes definir un estilo 'link' para estos botones
                    className={styles.variantButton}
                  >
                    {variant.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Botón para volver al ejercicio principal si estamos viendo una variante */}
          {isVariantCurrentlyDisplayed && (
            <div className={styles.backToMainButtonContainer}>
              <Button onClick={handleBackToMainExercise} variant="tertiary">Volver al Ejercicio Principal</Button>
            </div>
          )}

          <div className={styles.imageVideoContainer}>
            {currentDisplayExercise.gif ? (
              <img src={currentDisplayExercise.gif} alt={currentDisplayExercise.name} className={styles.exerciseMedia} />
            ) : (
              <img src={currentDisplayExercise.image} alt={currentDisplayExercise.name} className={styles.exerciseMedia} />
            )}
            {currentDisplayExercise.videoLink && (
              <div className={styles.videoWrapper}>
                <iframe
                  src={currentDisplayExercise.videoLink}
                  title={`${currentDisplayExercise.name} video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          <div className={styles.descriptionSection}>
            <h3>DESCRIPCIÓN:</h3>
            {Array.isArray(currentDisplayExercise.description) ? (
              currentDisplayExercise.description.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))
            ) : (
              <p>{currentDisplayExercise.description}</p>
            )}

            <h3>PASO A PASO:</h3>
            <ol>
              {currentDisplayExercise.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className={styles.inputSection}>
            <h3>REGISTRO DE PROGRESO:</h3>
            <div className={styles.inputGroup}>
              <label htmlFor="week">Semana:</label>
              <input
                type="text"
                id="week"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                placeholder="Ej: Semana 1"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="kgLb">Kg/Lb:</label>
              <input
                type="text"
                id="kgLb"
                value={kgLb}
                onChange={(e) => setKgLb(e.target.value)}
                placeholder="Ej: 10kg o 20lb"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="reps">Repeticiones:</label>
              <input
                type="number"
                id="reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="Ej: 12"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="sets">Series:</label>
              <input
                type="number"
                id="sets"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                placeholder="Ej: 3"
              />
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button onClick={handleResetFields} variant="danger">Resetear Campos</Button>
          <Button onClick={onClose}>Cerrar</Button> {/* Cambié "Volver Atrás" a "Cerrar" para el modal */}
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;