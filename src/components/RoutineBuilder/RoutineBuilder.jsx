import React, { useState } from 'react';
import { muscleGroups } from '../../data/exercisesData';
import { fetchExercisesByMuscle } from '../../services/exerciseApi';
import styles from './RoutineBuilder.module.css';

const STEP = { MUSCLES: 0, EXERCISES: 1, ROUTINE: 2 };

const RoutineBuilder = ({ onSelectExercise, onBack }) => {
  const [step, setStep]               = useState(STEP.MUSCLES);
  const [selectedMuscles, setSelected] = useState([]);
  const [exercisePool, setPool]        = useState([]);
  const [routine, setRoutine]          = useState([]);
  const [loading, setLoading]          = useState(false);
  const [activeTab, setActiveTab]      = useState(null);

  const toggleMuscle = id =>
    setSelected(p => p.includes(id) ? p.filter(m => m !== id) : [...p, id]);

  const loadExercises = async () => {
    setLoading(true);
    const pool = [];
    for (const mid of selectedMuscles) {
      try {
        const exs = await fetchExercisesByMuscle(mid);
        const mg = muscleGroups.find(m => m.id === mid);
        pool.push(...exs.map(e => ({ ...e, muscleId: mid, muscleName: mg?.name || mid })));
      } catch {}
    }
    const seen = new Set();
    const unique = pool.filter(e => { if (seen.has(e.id)) return false; seen.add(e.id); return true; });
    setPool(unique);
    setActiveTab(selectedMuscles[0] || null);
    setLoading(false);
    setStep(STEP.EXERCISES);
  };

  const isInRoutine = id => routine.some(r => r.id === id);

  const toggleInRoutine = ex => {
    setRoutine(p =>
      p.find(r => r.id === ex.id)
        ? p.filter(r => r.id !== ex.id)
        : [...p, { ...ex, done: false }]
    );
  };

  const toggleDone  = id => setRoutine(p => p.map(r => r.id === id ? { ...r, done: !r.done } : r));
  const resetDone   = () => setRoutine(p => p.map(r => ({ ...r, done: false })));

  const moveUp = i => {
    if (i === 0) return;
    setRoutine(p => { const a = [...p]; [a[i-1], a[i]] = [a[i], a[i-1]]; return a; });
  };
  const moveDown = i => {
    setRoutine(p => {
      if (i >= p.length - 1) return p;
      const a = [...p]; [a[i], a[i+1]] = [a[i+1], a[i]]; return a;
    });
  };

  const goBack = () => {
    if (step === STEP.MUSCLES)   { onBack(); return; }
    if (step === STEP.EXERCISES) { setStep(STEP.MUSCLES); return; }
    setStep(STEP.EXERCISES);
  };

  const tabExercises = activeTab
    ? exercisePool.filter(e => e.muscleId === activeTab)
    : exercisePool;

  const doneCount = routine.filter(r => r.done).length;
  const progress  = routine.length ? (doneCount / routine.length) * 100 : 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={goBack} className={styles.backBtn}>❮</button>
        <div className={styles.headerInfo}>
          <h2 className={styles.headerTitle}>📋 RUTINA</h2>
          {step === STEP.EXERCISES && routine.length > 0 && (
            <span className={styles.badge}>{routine.length} selec.</span>
          )}
          {step === STEP.ROUTINE && (
            <span className={styles.badge}>{doneCount}/{routine.length} ✓</span>
          )}
        </div>
      </div>

      <div className={styles.body}>

        {/* ── STEP 0: MUSCLE SELECTION ── */}
        {step === STEP.MUSCLES && (
          <div className={styles.section}>
            <p className={styles.q}>¿Qué zonas musculares vas a entrenar?</p>
            <div className={styles.muscleGrid}>
              {muscleGroups.map(m => (
                <button
                  key={m.id}
                  className={`${styles.chip} ${selectedMuscles.includes(m.id) ? styles.chipActive : ''}`}
                  onClick={() => toggleMuscle(m.id)}
                >
                  {m.name}
                </button>
              ))}
            </div>
            <button
              className={styles.primaryBtn}
              onClick={loadExercises}
              disabled={selectedMuscles.length === 0 || loading}
            >
              {loading ? 'CARGANDO...' : `VER EJERCICIOS (${selectedMuscles.length}) →`}
            </button>
          </div>
        )}

        {/* ── STEP 1: EXERCISE SELECTION ── */}
        {step === STEP.EXERCISES && (
          <div className={styles.section}>
            <div className={styles.tabs}>
              {selectedMuscles.map(mid => {
                const mg = muscleGroups.find(m => m.id === mid);
                return (
                  <button
                    key={mid}
                    className={`${styles.tab} ${activeTab === mid ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab(mid)}
                  >
                    {mg?.name || mid}
                  </button>
                );
              })}
            </div>

            {loading ? (
              <div className={styles.loadRow}><div className={styles.spin}/><span>Cargando ejercicios...</span></div>
            ) : (
              <div className={styles.exList}>
                {tabExercises.map(ex => (
                  <div key={ex.id} className={`${styles.exItem} ${isInRoutine(ex.id) ? styles.exAdded : ''}`}>
                    {ex.image && (
                      <img src={ex.image} alt="" className={styles.exThumb}
                        onError={e => { e.target.style.display = 'none'; }} />
                    )}
                    <button className={styles.exName} onClick={() => onSelectExercise?.(ex)}>
                      {ex.name}
                    </button>
                    <button
                      className={`${styles.addBtn} ${isInRoutine(ex.id) ? styles.addBtnDone : ''}`}
                      onClick={() => toggleInRoutine(ex)}
                    >
                      {isInRoutine(ex.id) ? '✓' : '+'}
                    </button>
                  </div>
                ))}
                {tabExercises.length === 0 && (
                  <p className={styles.empty}>Sin ejercicios disponibles.</p>
                )}
              </div>
            )}

            {routine.length > 0 && (
              <div className={styles.finalizeBar}>
                <span className={styles.finalizeCount}>{routine.length} ejercicio{routine.length !== 1 ? 's' : ''}</span>
                <button className={styles.finalizeBtn} onClick={() => setStep(STEP.ROUTINE)}>
                  FINALIZAR RUTINA →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: ROUTINE CHECKLIST ── */}
        {step === STEP.ROUTINE && (
          <div className={styles.section}>
            <div className={styles.routineHeader}>
              <p className={styles.routineTitle}>TU RUTINA</p>
              <p className={styles.routineSub}>{doneCount} / {routine.length} completados</p>
            </div>

            <div className={styles.progressWrap}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles.checkList}>
              {routine.map((ex, i) => (
                <div key={ex.id} className={`${styles.checkItem} ${ex.done ? styles.checkDone : ''}`}>
                  <button className={styles.checkbox} onClick={() => toggleDone(ex.id)}>
                    {ex.done ? '✓' : ''}
                  </button>
                  <div className={styles.checkInfo} onClick={() => onSelectExercise?.(ex)}>
                    <span className={styles.checkNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.checkName}>{ex.name}</span>
                    <span className={styles.checkMuscle}>{ex.muscleName}</span>
                  </div>
                  <div className={styles.orderBtns}>
                    <button className={styles.orderBtn} onClick={() => moveUp(i)} disabled={i === 0}>↑</button>
                    <button className={styles.orderBtn} onClick={() => moveDown(i)} disabled={i === routine.length - 1}>↓</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <button className={styles.ghostBtn} onClick={resetDone}>↺ REINICIAR</button>
              <button className={styles.ghostBtn} onClick={() => setStep(STEP.EXERCISES)}>✎ EDITAR</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RoutineBuilder;
