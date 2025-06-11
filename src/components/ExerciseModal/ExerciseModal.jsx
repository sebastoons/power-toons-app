// src/components/ExerciseModal/ExerciseModal.jsx

import React, { useState, useEffect } from 'react';
import Button from '../Shared/Button/Button';
import styles from './ExerciseModal.module.css';

const ExerciseModal = ({ exercise, onClose }) => {
  const [currentDisplayExercise, setCurrentDisplayExercise] = useState(exercise);

  const [week, setWeek] = useState('');
  const [kgLb, setKgLb] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');

  const localStorageKey = `exerciseData-${currentDisplayExercise.id}`;

  useEffect(() => {
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
        localStorage.removeItem(localStorageKey);
      }
    }
  }, [currentDisplayExercise.id, localStorageKey]);

  useEffect(() => {
    const dataToSave = { week, kgLb, reps, sets };
    localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
  }, [week, kgLb, reps, sets, localStorageKey]);

  useEffect(() => {
    setCurrentDisplayExercise(exercise);
  }, [exercise]);


  const handleResetFields = () => {
    setWeek('');
    setKgLb('');
    setReps('');
    setSets('');
    localStorage.removeItem(localStorageKey);
  };

  const handleSelectVariant = (variant) => {
    setCurrentDisplayExercise(variant);
  };

  const handleBackToMainExercise = () => {
    setCurrentDisplayExercise(exercise);
  };

  if (!exercise) return null;

  const isVariantCurrentlyDisplayed = currentDisplayExercise.id !== exercise.id;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{currentDisplayExercise.name}</h2>
          <Button onClick={onClose} variant="secondary">X</Button>
        </div>

        <div className={styles.modalBody}>
          {/* Contenedor de la columna izquierda (imagen/video y variantes) */}
          <div className={styles.leftColumn}>
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

            {/* Sección de Variantes */}
            {exercise.variants && exercise.variants.length > 0 && !isVariantCurrentlyDisplayed && (
              <div className={styles.variantsSection}>
                <h3>VARIANTES:</h3>
                <div className={styles.variantLinks}>
                  {exercise.variants.map((variant) => (
                    <Button
                      key={variant.id}
                      onClick={() => handleSelectVariant(variant)}
                      variant="link"
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
          </div> {/* CIERRE DEL leftColumn */}

          {/* Contenedor de la columna derecha (Descripción, Paso a Paso y Registro de Progreso) */}
          <div className={styles.rightColumn}>
            {/* Nuevo div para agrupar Descripción y Paso a Paso */}
            <div className={styles.descriptionAndSteps}> {/* <--- NUEVO CONTENEDOR */}
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
            </div> {/* <--- CIERRE DEL NUEVO CONTENEDOR descriptionAndSteps */}

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
          </div> {/* CIERRE DEL rightColumn */}
        </div> {/* Cierre de modalBody */}

        <div className={styles.modalFooter}>
          <Button onClick={handleResetFields} variant="danger">Resetear Campos</Button>
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;