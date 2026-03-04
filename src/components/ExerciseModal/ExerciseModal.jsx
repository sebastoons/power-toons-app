// src/components/ExerciseModal/ExerciseModal.jsx

import React, { useState, useEffect } from 'react';
import Button from '../Shared/Button/Button';
import styles from './ExerciseModal.module.css';

const ExerciseModal = ({ exercise, onClose }) => {
  const [currentDisplayExercise, setCurrentDisplayExercise] = useState(exercise);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); 
  const [kgLb, setKgLb] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');

  const [history, setHistory] = useState([]);

  const localStorageKey = `exerciseData-${currentDisplayExercise.id}`;

  // PROTECCIÓN 1: Bloque Try/Catch envolviendo TODO el localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(localStorageKey);
      if (savedData) {
        setHistory(JSON.parse(savedData));
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Error al leer datos de localStorage (Posible restricción móvil):", error);
      setHistory([]); // Fallback seguro
    }
  }, [currentDisplayExercise.id, localStorageKey]);

  useEffect(() => {
    setCurrentDisplayExercise(exercise);
  }, [exercise]);

  const handleAddRecord = () => {
    if (!kgLb || !reps || !sets) {
      alert("Por favor, completa peso, repeticiones y series.");
      return;
    }

    const newRecord = {
      id: Date.now(), 
      date,
      kgLb,
      reps,
      sets
    };

    const updatedHistory = [...history, newRecord];
    setHistory(updatedHistory);
    
    // PROTECCIÓN al guardar
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("No se pudo guardar en el celular. Almacenamiento lleno o bloqueado.", e);
      alert("Error: Tu navegador bloqueó el guardado del progreso.");
    }

    setKgLb('');
    setReps('');
    setSets('');
  };

  const handleDeleteRecord = (idToRemove) => {
    const updatedHistory = history.filter(record => record.id !== idToRemove);
    setHistory(updatedHistory);
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(updatedHistory));
    } catch(e) {}
  };

  const handleResetFields = () => {
    if(window.confirm("¿Estás seguro de borrar TODO el historial de este ejercicio?")) {
      setHistory([]);
      try {
        localStorage.removeItem(localStorageKey);
      } catch(e) {}
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

  // PROTECCIÓN: Asegurarse de que history sea un array antes de hacer reverse().map()
  const safeHistory = Array.isArray(history) ? history : [];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{currentDisplayExercise.name}</h2>
          <Button onClick={onClose} variant="secondary">X</Button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.leftColumn}>
            <div className={styles.imageVideoContainer}>
              {/* PROTECCIÓN 2: Mostrar medios solo si existen */}
              {currentDisplayExercise.gif ? (
                <img src={currentDisplayExercise.gif} alt={currentDisplayExercise.name} className={styles.exerciseMedia} />
              ) : currentDisplayExercise.image ? (
                <img src={currentDisplayExercise.image} alt={currentDisplayExercise.name} className={styles.exerciseMedia} />
              ) : null}

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

            {currentDisplayExercise.variants && currentDisplayExercise.variants.length > 0 && !isVariantCurrentlyDisplayed && (
              <div className={styles.variantsSection}>
                <h3>VARIANTES:</h3>
                <div className={styles.variantLinks}>
                  {currentDisplayExercise.variants.map((variant) => (
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

          <div className={styles.rightColumn}>
            <div className={styles.descriptionAndSteps}>
                <div className={styles.descriptionSection}>
                  
                  {/* PROTECCIÓN 3: Si no hay descripción, no falla */}
                  {currentDisplayExercise.description && (
                    <>
                      <h3>DESCRIPCIÓN:</h3>
                      {Array.isArray(currentDisplayExercise.description) ? (
                        currentDisplayExercise.description.map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))
                      ) : (
                        <p>{currentDisplayExercise.description}</p>
                      )}
                    </>
                  )}

                  {/* PROTECCIÓN 4: Causa número 1 de pantallas blancas. Si un ejercicio no tiene 'steps', la app ya no explotará */}
                  {currentDisplayExercise.steps && Array.isArray(currentDisplayExercise.steps) && currentDisplayExercise.steps.length > 0 && (
                    <>
                      <h3>PASO A PASO:</h3>
                      <ol>
                        {currentDisplayExercise.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </>
                  )}
                </div>
            </div>

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
                {safeHistory.length === 0 ? (
                  <p className={styles.noHistory}>No hay registros aún.</p>
                ) : (
                  <ul className={styles.historyList}>
                    {[...safeHistory].reverse().map(record => (
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