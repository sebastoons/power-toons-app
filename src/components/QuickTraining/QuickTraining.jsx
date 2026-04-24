import React, { useState } from 'react';
import { fetchExercisesByMuscle } from '../../services/exerciseApi';
import styles from './QuickTraining.module.css';

const STEP = { TYPE: 0, MUSCLES: 1, TIME: 2, GOAL: 3, PLAN: 4 };

const TYPES = [
  { id: 'gym',      label: 'GYM',      icon: '🏋️', desc: 'Pesas y máquinas' },
  { id: 'crossfit', label: 'CROSSFIT', icon: '🔥', desc: 'Alta intensidad' },
  { id: 'yoga',     label: 'YOGA',     icon: '🧘', desc: 'Flexibilidad y calma' },
];

const MUSCLES = [
  { id: 'chest',      label: 'PECHO',          icon: '💪' },
  { id: 'back',       label: 'ESPALDA',         icon: '🔙' },
  { id: 'hombro',     label: 'HOMBROS',         icon: '🏔️' },
  { id: 'biceps',     label: 'BÍCEPS',          icon: '💪' },
  { id: 'triceps',    label: 'TRÍCEPS',         icon: '🦾' },
  { id: 'forearms',   label: 'ANTE BRAZO',      icon: '✊' },
  { id: 'abs',        label: 'ABDOMINALES',     icon: '⚡' },
  { id: 'quads',      label: 'CUÁDRICEPS',      icon: '🦵' },
  { id: 'hamstrings', label: 'ISQUIOTIBIALES',  icon: '🦵' },
  { id: 'glutes',     label: 'GLÚTEOS',         icon: '🍑' },
  { id: 'legs',       label: 'PIERNAS',         icon: '👟' },
  { id: 'neck',       label: 'CUELLO',          icon: '🔝' },
];

const TIMES = [
  { id: 15,  label: '15 min', desc: 'Express',    exCount: 3 },
  { id: 30,  label: '30 min', desc: 'Estándar',   exCount: 5 },
  { id: 45,  label: '45 min', desc: 'Completo',   exCount: 7 },
  { id: 60,  label: '60 min', desc: 'Intensivo',  exCount: 10 },
];

const GOALS = [
  { id: 'fuerza',      label: 'FUERZA',      icon: '⚡', sets: 5, reps: '3-5',  rest: '3-5 min',  note: 'Cargas máximas · Progresión pesada' },
  { id: 'hipertrofia', label: 'HIPERTROFIA', icon: '📈', sets: 4, reps: '8-12', rest: '60-90 seg', note: 'Técnica perfecta · Tiempo bajo tensión' },
  { id: 'estetico',    label: 'ESTÉTICO',    icon: '✨', sets: 3, reps: '12-15',rest: '45-60 seg', note: 'Conexión mente-músculo · Pump' },
  { id: 'cardio',      label: 'CARDIO',      icon: '🔥', sets: 3, reps: '20+',  rest: '30 seg',   note: 'Alta intensidad · Circuito' },
];

const QuickTraining = ({ onSelectExercise, onBack }) => {
  const [step, setStep]           = useState(STEP.TYPE);
  const [type, setType]           = useState(null);
  const [muscles, setMuscles]     = useState([]);
  const [time, setTime]           = useState(null);
  const [goal, setGoal]           = useState(null);
  const [plan, setPlan]           = useState(null);
  const [loading, setLoading]     = useState(false);

  const toggleMuscle = (id) =>
    setMuscles(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);

  const generatePlan = async () => {
    setLoading(true);
    const cfg    = GOALS.find(g => g.id === goal);
    const exCount = TIMES.find(t => t.id === time)?.exCount || 5;

    const pool = [];
    const selected = muscles.length > 0 ? muscles : ['chest', 'back', 'abs'];

    for (const mid of selected) {
      try {
        const exs = await fetchExercisesByMuscle(mid);
        pool.push(...exs.slice(0, 4).map(e => ({ ...e, muscleId: mid })));
      } catch { /* skip */ }
    }

    // Deduplicate by id, distribute across muscle groups, limit to exCount
    const seen = new Set();
    const unique = pool.filter(e => { if (seen.has(e.id)) return false; seen.add(e.id); return true; });

    // Round-robin across muscle groups for variety
    const byMuscle = {};
    selected.forEach(m => { byMuscle[m] = unique.filter(e => e.muscleId === m); });
    const balanced = [];
    let i = 0;
    while (balanced.length < exCount) {
      const mid = selected[i % selected.length];
      const pool2 = byMuscle[mid];
      if (pool2?.length > 0) balanced.push(pool2.shift());
      i++;
      if (i > exCount * 3) break;
    }

    setPlan({ exercises: balanced.slice(0, exCount), cfg });
    setStep(STEP.PLAN);
    setLoading(false);
  };

  const goBack = () => {
    if (step === STEP.TYPE) { onBack(); return; }
    setStep(s => s - 1);
    if (step === STEP.PLAN) setPlan(null);
  };

  const STEP_LABELS = ['TIPO', 'MÚSCULOS', 'TIEMPO', 'OBJETIVO', 'PLAN'];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={goBack} className={styles.backBtn}>❮</button>
        <div className={styles.headerInfo}>
          <h2 className={styles.headerTitle}>⚡ ENTRENAMIENTO RÁPIDO</h2>
          {step < STEP.PLAN && (
            <div className={styles.steps}>
              {STEP_LABELS.slice(0,4).map((l, i) => (
                <span key={i} className={`${styles.stepDot} ${i <= step ? styles.stepActive : ''}`}>{l}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.body}>

        {/* STEP 0 – Tipo */}
        {step === STEP.TYPE && (
          <div className={styles.section}>
            <p className={styles.question}>¿Qué tipo de entrenamiento quieres?</p>
            <div className={styles.typeGrid}>
              {TYPES.map(t => (
                <button key={t.id} className={`${styles.typeCard} ${type===t.id ? styles.typeSelected : ''}`}
                  onClick={() => { setType(t.id); setStep(STEP.MUSCLES); }}>
                  <span className={styles.typeIcon}>{t.icon}</span>
                  <span className={styles.typeLabel}>{t.label}</span>
                  <span className={styles.typeDesc}>{t.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1 – Músculos */}
        {step === STEP.MUSCLES && (
          <div className={styles.section}>
            <p className={styles.question}>¿Qué zonas musculares quieres trabajar?</p>
            <p className={styles.subq}>Selecciona una o más (opcional)</p>
            <div className={styles.muscleGrid}>
              {MUSCLES.map(m => (
                <button key={m.id}
                  className={`${styles.muscleChip} ${muscles.includes(m.id) ? styles.muscleSelected : ''}`}
                  onClick={() => toggleMuscle(m.id)}>
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
            <button className={styles.nextBtn} onClick={() => setStep(STEP.TIME)}>
              {muscles.length === 0 ? 'SALTAR →' : `CONTINUAR (${muscles.length}) →`}
            </button>
          </div>
        )}

        {/* STEP 2 – Tiempo */}
        {step === STEP.TIME && (
          <div className={styles.section}>
            <p className={styles.question}>¿Cuánto tiempo tienes disponible?</p>
            <div className={styles.timeGrid}>
              {TIMES.map(t => (
                <button key={t.id}
                  className={`${styles.timeCard} ${time===t.id ? styles.timeSelected : ''}`}
                  onClick={() => { setTime(t.id); setStep(STEP.GOAL); }}>
                  <span className={styles.timeLabel}>{t.label}</span>
                  <span className={styles.timeDesc}>{t.desc}</span>
                  <span className={styles.timeEx}>{t.exCount} ejercicios</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 – Objetivo */}
        {step === STEP.GOAL && (
          <div className={styles.section}>
            <p className={styles.question}>¿Cuál es tu objetivo?</p>
            <div className={styles.goalGrid}>
              {GOALS.map(g => (
                <button key={g.id}
                  className={`${styles.goalCard} ${goal===g.id ? styles.goalSelected : ''}`}
                  onClick={() => { setGoal(g.id); }}>
                  <span className={styles.goalIcon}>{g.icon}</span>
                  <span className={styles.goalLabel}>{g.label}</span>
                  <span className={styles.goalDetail}>{g.sets} series × {g.reps} reps</span>
                  <span className={styles.goalNote}>{g.note}</span>
                </button>
              ))}
            </div>
            {goal && (
              <button className={styles.nextBtn} onClick={generatePlan} disabled={loading}>
                {loading ? 'GENERANDO PLAN...' : '⚡ GENERAR MI PLAN →'}
              </button>
            )}
            {loading && <div className={styles.loadRow}><div className={styles.spin}/><span>Buscando ejercicios...</span></div>}
          </div>
        )}

        {/* STEP 4 – Plan */}
        {step === STEP.PLAN && plan && (
          <div className={styles.section}>
            <div className={styles.planHeader}>
              <div>
                <p className={styles.planTitle}>TU PLAN ESTÁ LISTO</p>
                <p className={styles.planSub}>
                  {TIMES.find(t=>t.id===time)?.label} · {GOALS.find(g=>g.id===goal)?.label} · {plan.exercises.length} ejercicios
                </p>
              </div>
              <div className={styles.planBadge}>
                <span className={styles.badgeSets}>{plan.cfg.sets} series</span>
                <span className={styles.badgeReps}>{plan.cfg.reps} reps</span>
                <span className={styles.badgeRest}>Descanso {plan.cfg.rest}</span>
              </div>
            </div>

            <p className={styles.planNote}>{plan.cfg.note}</p>

            <div className={styles.planList}>
              {plan.exercises.map((ex, i) => (
                <button key={ex.id} className={styles.planItem} onClick={() => onSelectExercise && onSelectExercise(ex)}>
                  <span className={styles.planNum}>{String(i+1).padStart(2,'0')}</span>
                  {ex.image && (
                    <img src={ex.image} alt="" className={styles.planThumb}
                      onError={e => e.target.style.display='none'} />
                  )}
                  <div className={styles.planInfo}>
                    <span className={styles.planName}>{ex.name}</span>
                    <span className={styles.planSeries}>{plan.cfg.sets}×{plan.cfg.reps} · descanso {plan.cfg.rest}</span>
                  </div>
                  <span className={styles.planArr}>›</span>
                </button>
              ))}
            </div>

            <button className={styles.restartBtn} onClick={() => { setStep(STEP.TYPE); setType(null); setMuscles([]); setTime(null); setGoal(null); setPlan(null); }}>
              ↺ NUEVO PLAN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickTraining;
