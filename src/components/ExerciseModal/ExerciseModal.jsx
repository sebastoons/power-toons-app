// src/components/ExerciseModal/ExerciseModal.jsx

import React, { useState, useEffect } from 'react';
import Button from '../Shared/Button/Button';
import styles from './ExerciseModal.module.css';

// 🤖 MOTOR DE TRADUCCIÓN AUTOMÁTICA (API pública gratuita)
const translateText = async (text) => {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    // Google devuelve la traducción en un arreglo anidado, lo extraemos:
    return data[0].map(item => item[0]).join('');
  } catch (error) {
    console.error("Error al traducir:", error);
    return text; // Si falla el internet, muestra el texto original en inglés para que no se rompa
  }
};

const ExerciseModal = ({ exercise, onClose }) => {
  const [currentDisplayExercise, setCurrentDisplayExercise] = useState(exercise);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); 
  const [kgLb, setKgLb] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [history, setHistory] = useState([]);

  // Estados para la traducción mágica
  const [translatedSteps, setTranslatedSteps] = useState([]);
  const [isTranslating, setIsTranslating] = useState(false);

  const localStorageKey = `exerciseData-${currentDisplayExercise.id}`;

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(localStorageKey);
      if (savedData) {
        setHistory(JSON.parse(savedData));
      } else {
        setHistory([]);
      }
    } catch (error) {
      setHistory([]); 
    }
  }, [currentDisplayExercise.id, localStorageKey]);

  useEffect(() => {
    setCurrentDisplayExercise(exercise);
  }, [exercise]);

  // EFECTO DE TRADUCCIÓN: Se ejecuta cada vez que abres un ejercicio
  useEffect(() => {
    const translateExerciseSteps = async () => {
      const stepsToTranslate = currentDisplayExercise.steps;

      if (stepsToTranslate && Array.isArray(stepsToTranslate) && stepsToTranslate.length > 0) {
        setIsTranslating(true); // Encendemos el aviso de "Traduciendo..."
        
        // Traducimos cada paso simultáneamente
        const translationPromises = stepsToTranslate.map(step => translateText(step));
        const translatedResults = await Promise.all(translationPromises);
        
        setTranslatedSteps(translatedResults);
        setIsTranslating(false); // Apagamos el aviso
      } else {
        setTranslatedSteps([]);
      }
    };

    translateExerciseSteps();
  }, [currentDisplayExercise]);

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
    
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(updatedHistory));
    } catch (e) {
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

  if (!exercise) return null;

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
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.descriptionAndSteps}>
                <div className={styles.descriptionSection}>
                  
                  {currentDisplayExercise.description && (
                    <>
                      <h3>DETALLES:</h3>
                      <p>{currentDisplayExercise.description}</p>
                    </>
                  )}

                  {/* ZONA DE PASO A PASO TRADUCIDA */}
                  {translatedSteps.length > 0 && (
                    <>
                      <h3>PASO A PASO:</h3>
                      {isTranslating ? (
                        <p style={{ color: '#001ba3', fontStyle: 'italic' }}>⏳ Traduciendo instrucciones al español...</p>
                      ) : (
                        <ol>
                          {translatedSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      )}
                    </>
                  )}
                </div>
            </div>

            {/* SECCIÓN DE REGISTRO */}
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