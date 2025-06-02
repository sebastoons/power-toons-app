import React, { useState, useEffect } from 'react';
import Button from '../Shared/Button/Button';
import styles from './ExerciseModal.module.css';

const ExerciseModal = ({ exercise, onClose }) => {
  const [week, setWeek] = useState('');
  const [kgLb, setKgLb] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');

  // Clave única para localStorage para este ejercicio
  const localStorageKey = `exerciseData-${exercise.id}`;

  // Cargar datos al montar el modal
  useEffect(() => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setWeek(parsedData.week || '');
      setKgLb(parsedData.kgLb || '');
      setReps(parsedData.reps || '');
      setSets(parsedData.sets || '');
    }
  }, [exercise.id, localStorageKey]);

  // Guardar datos cada vez que cambian los estados
  useEffect(() => {
    const dataToSave = { week, kgLb, reps, sets };
    localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
  }, [week, kgLb, reps, sets, localStorageKey]);

  const handleResetFields = () => {
    setWeek('');
    setKgLb('');
    setReps('');
    setSets('');
    localStorage.removeItem(localStorageKey); // Eliminar también del localStorage
  };

  if (!exercise) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{exercise.name}</h2>
          <Button onClick={onClose} variant="secondary">X</Button> {/* Botón de cerrar */}
        </div>

        <div className={styles.modalBody}>
          <div className={styles.imageVideoContainer}>
            {exercise.gif ? (
              <img src={exercise.gif} alt={exercise.name} className={styles.exerciseMedia} />
            ) : (
              <img src={exercise.image} alt={exercise.name} className={styles.exerciseMedia} />
            )}
            {exercise.videoLink && (
              <div className={styles.videoWrapper}>
                <iframe
                  src={exercise.videoLink}
                  title={`${exercise.name} video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          <div className={styles.descriptionSection}>
            <h3>DESCRIPCIÓN:</h3>
            <p>{exercise.description}</p>

            <h3>PASO A PASO:</h3>
            <ol>
              {exercise.steps.map((step, index) => (
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
          <Button onClick={onClose}>Volver Atrás</Button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;