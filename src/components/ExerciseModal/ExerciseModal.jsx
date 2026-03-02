// src/components/ExerciseModal/ExerciseModal.jsx

import React, { useState, useEffect } from 'react';
import Button from '../Shared/Button/Button';
import styles from './ExerciseModal.module.css';

const ExerciseModal = ({ exercise, onClose }) => {
  const [currentDisplayExercise, setCurrentDisplayExercise] = useState(exercise);

  // Estados para el nuevo registro
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Fecha de hoy por defecto
  const [kgLb, setKgLb] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');

  // Estado para el historial completo
  const [history, setHistory] = useState([]);

  const localStorageKey = `exerciseData-${currentDisplayExercise.id}`;

  // Cargar historial al abrir o cambiar de ejercicio
  useEffect(() => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      try {
        setHistory(JSON.parse(savedData));
      } catch (error) {
        console.error("Error al parsear datos de localStorage:", error);
        setHistory([]);
      }
    } else {
      setHistory([]);
    }
  }, [currentDisplayExercise.id, localStorageKey]);

  useEffect(() => {
    setCurrentDisplayExercise(exercise);
  }, [exercise]);

  // Función para guardar un nuevo registro en el historial
  const handleAddRecord = () => {
    if (!kgLb || !reps || !sets) {
      alert("Por favor, completa peso, repeticiones y series.");
      return;
    }

    const newRecord = {
      id: Date.now(), // ID único basado en la fecha actual
      date,
      kgLb,
      reps,
      sets
    };

    const updatedHistory = [...history, newRecord];
    setHistory(updatedHistory);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedHistory));

    // Limpiar campos después de guardar (mantenemos la fecha)
    setKgLb('');
    setReps('');
    setSets('');
  };

  // Función para eliminar un registro específico
  const handleDeleteRecord = (idToRemove) => {
    const updatedHistory = history.filter(record => record.id !== idToRemove);
    setHistory(updatedHistory);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedHistory));
  };

  const handleResetFields = () => {
    if(window.confirm("¿Estás seguro de borrar TODO el historial de este ejercicio?")) {
      setHistory([]);
      localStorage.removeItem(localStorageKey);
    }
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
          {/* Columna Izquierda */}
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

            {/* Variantes */}
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

            {isVariantCurrentlyDisplayed && (
              <div className={styles.backToMainButtonContainer}>
                <Button onClick={handleBackToMainExercise} variant="tertiary">Volver al Ejercicio Principal</Button>
              </div>
            )}
          </div>

          {/* Columna Derecha */}
          <div className={styles.rightColumn}>
            <div className={styles.descriptionAndSteps}>
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
            </div>

            {/* SECCIÓN DE REGISTRO MODIFICADA */}
            <div className={styles.inputSection}>
              <h3>NUEVO REGISTRO:</h3>
              <div className={styles.inputForm}>
                <div className={styles.inputGroup}>
                  <label>Fecha:</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className={styles.rowInputs}>
                  <div className={styles.inputGroup}>
                    <label>Peso:</label>
                    <input type="text" value={kgLb} onChange={(e) => setKgLb(e.target.value)} placeholder="Ej: 20kg" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Sets:</label>
                    <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} placeholder="Ej: 4" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Reps:</label>
                    <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="Ej: 10" />
                  </div>
                </div>
                <Button onClick={handleAddRecord} variant="primary" className={styles.addRecordBtn}>Guardar Serie</Button>
              </div>

              <div className={styles.historySection}>
                <h3>HISTORIAL:</h3>
                {history.length === 0 ? (
                  <p className={styles.noHistory}>No hay registros aún.</p>
                ) : (
                  <ul className={styles.historyList}>
                    {/* Invertimos el array para ver el más reciente arriba */}
                    {[...history].reverse().map(record => (
                      <li key={record.id} className={styles.historyItem}>
                        <div className={styles.historyData}>
                          <span className={styles.historyDate}>{new Date(record.date).toLocaleDateString()}</span>
                          <span className={styles.historyDetails}>
                            {record.sets}x{record.reps} | {record.kgLb}
                          </span>
                        </div>
                        <button onClick={() => handleDeleteRecord(record.id)} className={styles.deleteBtn}>🗑️</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button onClick={handleResetFields} variant="danger">Borrar Todo el Historial</Button>
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;