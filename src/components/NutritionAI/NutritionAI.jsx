import React, { useState, useMemo } from 'react';
import styles from './NutritionAI.module.css';

/* ── Food database (expanded) ── */
const FOODS = {
  desayuno: [
    { name: 'Avena + plátano + almendras',       cal: 380, p: 14, c: 58, f: 10, goal: ['maintain','gain'], tag: 'Energía sostenida' },
    { name: 'Huevos revueltos + pan integral',    cal: 340, p: 22, c: 32, f: 12, goal: ['maintain','gain','lose'], tag: 'Alto en proteína' },
    { name: 'Yogur griego + granola + berries',   cal: 320, p: 20, c: 40, f: 7,  goal: ['maintain','lose'], tag: 'Probióticos' },
    { name: 'Batido proteico + banana + chia',    cal: 290, p: 28, c: 38, f: 4,  goal: ['gain','maintain'], tag: 'Post-entreno' },
    { name: 'Tostadas aguacate + huevo pochado',  cal: 350, p: 18, c: 30, f: 16, goal: ['maintain','lose'], tag: 'Grasas saludables' },
    { name: 'Claras de huevo + avena + fruta',    cal: 260, p: 24, c: 36, f: 3,  goal: ['lose'], tag: 'Déficit calórico' },
    { name: 'Panqueques de avena + miel',         cal: 420, p: 16, c: 68, f: 8,  goal: ['gain'], tag: 'Superávit' },
  ],
  snack: [
    { name: 'Manzana + mantequilla de maní',      cal: 210, p: 7,  c: 26, f: 9,  goal: ['maintain','gain'], tag: 'Saciante' },
    { name: 'Batido de proteína + leche',          cal: 200, p: 28, c: 14, f: 4,  goal: ['gain','maintain'], tag: 'Recuperación' },
    { name: 'Almendras + nueces (30g)',            cal: 180, p: 6,  c: 6,  f: 16, goal: ['maintain','lose'], tag: 'Omega-3' },
    { name: 'Queso cottage + frutas del bosque',  cal: 160, p: 18, c: 14, f: 2,  goal: ['lose','maintain'], tag: 'Bajo en grasa' },
    { name: 'Hummus + zanahoria + pepino',         cal: 140, p: 6,  c: 18, f: 5,  goal: ['lose'], tag: 'Fibra' },
    { name: 'Plátano + 2 huevos duros',            cal: 230, p: 14, c: 28, f: 8,  goal: ['gain'], tag: 'Carbos + proteína' },
    { name: 'Arroz de tortitas + pavo',            cal: 190, p: 16, c: 22, f: 3,  goal: ['lose','maintain'], tag: 'Ligero' },
  ],
  almuerzo: [
    { name: 'Pollo a la plancha + arroz integral + brócoli', cal: 560, p: 48, c: 58, f: 10, goal: ['maintain','gain'], tag: 'Clásico fitness' },
    { name: 'Salmón al horno + batata + espárragos',         cal: 580, p: 44, c: 52, f: 18, goal: ['maintain','lose'], tag: 'Omega-3' },
    { name: 'Carne magra + quinua + ensalada mixta',         cal: 540, p: 52, c: 46, f: 14, goal: ['gain','maintain'], tag: 'Alta proteína' },
    { name: 'Lentejas guisadas + arroz + verduras',          cal: 490, p: 28, c: 72, f: 6,  goal: ['maintain','lose'], tag: 'Vegetariano' },
    { name: 'Atún + pasta integral + tomate',                cal: 520, p: 40, c: 64, f: 8,  goal: ['maintain','gain'], tag: 'Energía' },
    { name: 'Pechuga + papas hervidas + ensalada',           cal: 480, p: 44, c: 46, f: 8,  goal: ['lose','maintain'], tag: 'Equilibrado' },
    { name: 'Bowl de bowl de arroz + edamame + aguacate',    cal: 600, p: 22, c: 70, f: 22, goal: ['gain'], tag: 'Superávit' },
  ],
  once: [
    { name: 'Té + 2 tostadas integrales + palta',           cal: 250, p: 6,  c: 30, f: 12, goal: ['maintain','lose'], tag: 'Tradicional saludable' },
    { name: 'Café + galletas de avena caseras',              cal: 220, p: 6,  c: 34, f: 6,  goal: ['maintain'], tag: 'Moderado' },
    { name: 'Leche + pan integral + queso fresco',           cal: 280, p: 16, c: 32, f: 8,  goal: ['maintain','gain'], tag: 'Calcio + proteína' },
    { name: 'Fruta de temporada + yogur natural',            cal: 160, p: 8,  c: 26, f: 2,  goal: ['lose'], tag: 'Ligero' },
    { name: 'Granola + leche descremada',                    cal: 300, p: 10, c: 52, f: 5,  goal: ['maintain','gain'], tag: 'Energía' },
    { name: 'Queso cottage + miel + nueces',                 cal: 240, p: 18, c: 20, f: 10, goal: ['maintain','lose'], tag: 'Proteína' },
  ],
  cena: [
    { name: 'Pechuga a la plancha + calabacín + batata',     cal: 460, p: 42, c: 44, f: 8,  goal: ['maintain','lose'], tag: 'Digestión liviana' },
    { name: 'Salmón + brócoli al vapor + arroz blanco',      cal: 480, p: 40, c: 48, f: 14, goal: ['maintain','gain'], tag: 'Omega-3 nocturno' },
    { name: 'Omelette 3 claras + vegetales salteados',       cal: 320, p: 28, c: 14, f: 14, goal: ['lose'], tag: 'Déficit nocturno' },
    { name: 'Pavo + ensalada verde + batata',                cal: 440, p: 38, c: 42, f: 8,  goal: ['maintain','lose'], tag: 'Triptófano' },
    { name: 'Tilapia + verduras asadas + arroz integral',    cal: 490, p: 42, c: 50, f: 8,  goal: ['maintain','gain'], tag: 'Blanco de proteína' },
    { name: 'Sopa de pollo + pan integral',                  cal: 380, p: 30, c: 40, f: 8,  goal: ['lose','maintain'], tag: 'Reconfortante' },
    { name: 'Carne magra + quinua + espinaca salteada',      cal: 520, p: 50, c: 44, f: 14, goal: ['gain'], tag: 'Superávit' },
  ],
};

const MEAL_LABELS = {
  desayuno: { icon: '🌅', label: 'DESAYUNO',  pct: 0.25 },
  snack:    { icon: '🥤', label: 'SNACK',     pct: 0.10 },
  almuerzo: { icon: '🍽️', label: 'ALMUERZO',  pct: 0.35 },
  once:     { icon: '☕', label: 'ONCE',      pct: 0.15 },
  cena:     { icon: '🌙', label: 'CENA',      pct: 0.20 },
};

const GOALS_MAP = { lose: 'perder', maintain: 'mantener', gain: 'ganar' };

const ACTIVITY = {
  sedentario:    { label: 'Sedentario',    sub: 'Sin ejercicio',         mult: 1.2   },
  ligero:        { label: 'Ligero',        sub: '1-3 días/semana',       mult: 1.375 },
  moderado:      { label: 'Moderado',      sub: '3-5 días/semana',       mult: 1.55  },
  activo:        { label: 'Activo',        sub: '6-7 días/semana',       mult: 1.725 },
  muyActivo:     { label: 'Muy activo',    sub: 'Atleta / 2x día',       mult: 1.9   },
};

const STEPS = { AGE:0, WEIGHT:1, HEIGHT:2, GENDER:3, GOAL:4, ACTIVITY:5, MEAL:6, RESULT:7 };

const NutritionAI = ({ onBack }) => {
  const [step, setStep]     = useState(STEPS.AGE);
  const [data, setData]     = useState({ age:'', weight:'', height:'', gender:'', goal:'', activity:'' });
  const [mealType, setMealType] = useState('');
  const [macros, setMacros] = useState(null);

  const set = (k, v) => setData(p => ({ ...p, [k]: v }));

  const calcMacros = (actKey) => {
    const w = +data.weight, h = +data.height, a = +data.age;
    const bmr = data.gender === 'male'
      ? 88.362 + 13.397*w + 4.799*h - 5.677*a
      : 447.593 + 9.247*w + 3.098*h - 4.330*a;
    const tdee  = bmr * ACTIVITY[actKey].mult;
    const delta = data.goal === 'lose' ? -500 : data.goal === 'gain' ? 500 : 0;
    const cal   = Math.round(tdee + delta);
    const prot  = Math.round(w * 2.2);
    const fat   = Math.round((cal * 0.25) / 9);
    const carb  = Math.round((cal - prot*4 - fat*9) / 4);
    setMacros({ cal, prot, fat, carb, bmr: Math.round(bmr), tdee: Math.round(tdee) });
    set('activity', actKey);
    setStep(STEPS.MEAL);
  };

  const recommendations = useMemo(() => {
    if (!macros || !mealType) return [];
    const pool = FOODS[mealType] || [];
    const targetCal = Math.round(macros.cal * MEAL_LABELS[mealType].pct);
    const goalKey = GOALS_MAP[data.goal] || 'mantener';

    return pool
      .filter(f => f.goal.includes(data.goal))
      .sort((a, b) => Math.abs(a.cal - targetCal) - Math.abs(b.cal - targetCal))
      .slice(0, 3);
  }, [macros, mealType, data.goal]);

  const inputStep = (field, next) => (
    <div className={styles.card}>
      <p className={styles.q}>{
        field === 'age'    ? '¿Cuántos años tienes?' :
        field === 'weight' ? '¿Cuánto pesas? (kg)' :
                             '¿Cuánto mides? (cm)'
      }</p>
      <input
        type="number"
        placeholder={field === 'age' ? 'Ej: 25' : field === 'weight' ? 'Ej: 75' : 'Ej: 175'}
        value={data[field]}
        onChange={e => set(field, e.target.value)}
        className={styles.input}
      />
      <button
        className={styles.nextBtn}
        onClick={() => data[field] && setStep(next)}
        disabled={!data[field]}
      >SIGUIENTE →</button>
    </div>
  );

  const optStep = (q, opts, onPick) => (
    <div className={styles.card}>
      <p className={styles.q}>{q}</p>
      <div className={styles.grid2}>
        {opts.map(o => (
          <button key={o.id} className={styles.optBtn} onClick={() => onPick(o.id)}>
            {o.icon && <span>{o.icon}</span>}
            <span className={styles.optLabel}>{o.label}</span>
            {o.sub && <span className={styles.optSub}>{o.sub}</span>}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => { if (step === STEPS.AGE) onBack(); else setStep(s => s - 1); }}
        >❮</button>
        <div>
          <h2 className={styles.title}>ASESOR NUTRICIONAL</h2>
          <div className={styles.progress}>
            <div className={styles.bar} style={{ width: `${(step / 7) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className={styles.body}>
        {step === STEPS.AGE    && inputStep('age',    STEPS.WEIGHT)}
        {step === STEPS.WEIGHT && inputStep('weight', STEPS.HEIGHT)}
        {step === STEPS.HEIGHT && inputStep('height', STEPS.GENDER)}

        {step === STEPS.GENDER && optStep('¿Cuál es tu sexo biológico?', [
          { id:'male',   label:'HOMBRE' },
          { id:'female', label:'MUJER'  },
        ], v => { set('gender', v); setStep(STEPS.GOAL); })}

        {step === STEPS.GOAL && optStep('¿Cuál es tu objetivo?', [
          { id:'lose',     label:'BAJAR PESO',  sub:'Déficit -500 kcal' },
          { id:'maintain', label:'MANTENERME',  sub:'Mantenimiento' },
          { id:'gain',     label:'GANAR MASA',  sub:'Superávit +500 kcal' },
        ], v => { set('goal', v); setStep(STEPS.ACTIVITY); })}

        {step === STEPS.ACTIVITY && (
          <div className={styles.card}>
            <p className={styles.q}>¿Cuál es tu nivel de actividad?</p>
            <div className={styles.grid1}>
              {Object.entries(ACTIVITY).map(([k, v]) => (
                <button key={k} className={styles.actBtn} onClick={() => calcMacros(k)}>
                  <span className={styles.optLabel}>{v.label}</span>
                  <span className={styles.optSub}>{v.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === STEPS.MEAL && macros && (
          <div className={styles.section}>
            {/* Macros summary */}
            <div className={styles.macroCard}>
              <p className={styles.macroTitle}>TUS MACROS DIARIOS</p>
              <div className={styles.macroRow}>
                <div className={styles.macroBadge}>
                  <span className={styles.macroVal}>{macros.cal}</span>
                  <span className={styles.macroLbl}>kcal</span>
                </div>
                <div className={styles.macroBadge}>
                  <span className={styles.macroVal}>{macros.prot}g</span>
                  <span className={styles.macroLbl}>proteína</span>
                </div>
                <div className={styles.macroBadge}>
                  <span className={styles.macroVal}>{macros.carb}g</span>
                  <span className={styles.macroLbl}>carbos</span>
                </div>
                <div className={styles.macroBadge}>
                  <span className={styles.macroVal}>{macros.fat}g</span>
                  <span className={styles.macroLbl}>grasas</span>
                </div>
              </div>
            </div>

            <p className={styles.q}>¿Qué tiempo de comida necesitas?</p>
            <div className={styles.mealGrid}>
              {Object.entries(MEAL_LABELS).map(([k, v]) => (
                <button
                  key={k}
                  className={`${styles.mealBtn} ${mealType===k ? styles.mealActive : ''}`}
                  onClick={() => { setMealType(k); setStep(STEPS.RESULT); }}
                >
                  <span className={styles.mealIcon}>{v.icon}</span>
                  <span className={styles.mealLabel}>{v.label}</span>
                  <span className={styles.mealPct}>{Math.round(macros.cal * v.pct)} kcal</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === STEPS.RESULT && macros && mealType && (
          <div className={styles.section}>
            <div className={styles.resultHeader}>
              <span>{MEAL_LABELS[mealType].icon}</span>
              <div>
                <p className={styles.resultTitle}>{MEAL_LABELS[mealType].label}</p>
                <p className={styles.resultSub}>
                  ~{Math.round(macros.cal * MEAL_LABELS[mealType].pct)} kcal objetivo ·{' '}
                  {data.goal === 'lose' ? 'Pérdida de peso' : data.goal === 'gain' ? 'Ganancia muscular' : 'Mantenimiento'}
                </p>
              </div>
            </div>

            {recommendations.length === 0 ? (
              <p className={styles.empty}>Sin recomendaciones para este perfil.</p>
            ) : (
              recommendations.map((f, i) => (
                <div key={i} className={`${styles.foodCard} ${i===0 ? styles.foodBest : ''}`}>
                  {i === 0 && <span className={styles.bestBadge}>MEJOR OPCIÓN</span>}
                  <div className={styles.foodHeader}>
                    <p className={styles.foodName}>{f.name}</p>
                    <span className={styles.foodTag}>{f.tag}</span>
                  </div>
                  <div className={styles.foodMacros}>
                    <span className={styles.calBadge}>{f.cal} kcal</span>
                    <span>P: <b>{f.p}g</b></span>
                    <span>C: <b>{f.c}g</b></span>
                    <span>G: <b>{f.f}g</b></span>
                  </div>
                </div>
              ))
            )}

            <div className={styles.actions}>
              <button className={styles.changeBtn} onClick={() => setStep(STEPS.MEAL)}>← CAMBIAR COMIDA</button>
              <button className={styles.restartBtn} onClick={() => { setStep(STEPS.AGE); setData({age:'',weight:'',height:'',gender:'',goal:'',activity:''}); setMacros(null); setMealType(''); }}>
                ↺ NUEVO PERFIL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionAI;
