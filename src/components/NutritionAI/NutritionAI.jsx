import React, { useState } from 'react';
import Button from '../Shared/Button/Button';
import styles from './NutritionAI.module.css';

const NutritionAI = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    goal: '',
    activityLevel: '',
  });
  const [nutritionPlan, setNutritionPlan] = useState(null);
  const [showMealPlan, setShowMealPlan] = useState(false);

  const mealDatabase = {
    desayuno: [
      { name: '🥚 Huevos revueltos con pan integral', calories: 350, protein: 15, carbs: 40, fats: 12 },
      { name: '🥣 Avena con plátano y miel', calories: 300, protein: 10, carbs: 50, fats: 6 },
      { name: '🥑 Toast aguacate + huevo', calories: 320, protein: 16, carbs: 35, fats: 14 },
      { name: '🍌 Smoothie proteico', calories: 280, protein: 20, carbs: 45, fats: 3 },
      { name: '🧀 Yogur griego con granola', calories: 350, protein: 18, carbs: 42, fats: 8 },
    ],
    snack_mañana: [
      { name: '🍎 Manzana + almendras', calories: 200, protein: 6, carbs: 25, fats: 9 },
      { name: '🥜 Barrita proteica', calories: 180, protein: 15, carbs: 20, fats: 5 },
      { name: '🥤 Batido de proteína', calories: 150, protein: 25, carbs: 10, fats: 2 },
      { name: '🍌 Plátano + mantequilla de maní', calories: 220, protein: 8, carbs: 28, fats: 10 },
      { name: '🧈 Queso fresco + frutas', calories: 180, protein: 12, carbs: 18, fats: 7 },
    ],
    almuerzo: [
      { name: '🍗 Pollo a la plancha + arroz integral + ensalada', calories: 550, protein: 45, carbs: 55, fats: 12 },
      { name: '🐟 Salmón + papas + verduras al vapor', calories: 580, protein: 42, carbs: 50, fats: 18 },
      { name: '🍝 Pasta integral con pechuga de pollo', calories: 520, protein: 40, carbs: 60, fats: 10 },
      { name: '🥩 Carne magra + quinua + brócoli', calories: 560, protein: 50, carbs: 48, fats: 14 },
      { name: '🍲 Lentejas con verduras + pan integral', calories: 480, protein: 35, carbs: 65, fats: 8 },
    ],
    snack_tarde: [
      { name: '🍎 Naranja + 10 almendras', calories: 180, protein: 5, carbs: 22, fats: 8 },
      { name: '🥛 Leche descremada + galletas integrales', calories: 200, protein: 8, carbs: 28, fats: 4 },
      { name: '🍌 Plátano + proteína en polvo', calories: 170, protein: 20, carbs: 25, fats: 1 },
      { name: '🧀 Queso descremado + frutas secas', calories: 210, protein: 14, carbs: 24, fats: 8 },
      { name: '🥒 Hummus + zanahoria + tomate', calories: 160, protein: 6, carbs: 20, fats: 6 },
    ],
    cena: [
      { name: '🍗 Pechuga a la plancha + batata + ensalada', calories: 480, protein: 40, carbs: 45, fats: 10 },
      { name: '🐟 Tilapia + brócoli + arroz blanco', calories: 450, protein: 38, carbs: 48, fats: 8 },
      { name: '🥗 Ensalada con atún + pan tostado', calories: 420, protein: 35, carbs: 42, fats: 12 },
      { name: '🍝 Pasta de garbanzo con tomate y pollo', calories: 470, protein: 42, carbs: 50, fats: 10 },
      { name: '🥚 Omelette de vegetales + papas', calories: 400, protein: 30, carbs: 44, fats: 11 },
    ],
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const calculateNutrition = () => {
    const weight = parseFloat(userData.weight);
    const height = parseFloat(userData.height);
    const age = parseFloat(userData.age);

    let bmr = userData.gender === 'male' 
      ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
      : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      heavy: 1.725,
      veryheavy: 1.9
    };

    let tdee = bmr * (activityMultipliers[userData.activityLevel] || 1.55);

    let calories = tdee;
    let goalText = 'MANTENER';
    if (userData.goal === 'lose') { 
      calories -= 500;
      goalText = 'PERDER PESO (-500 cal)';
    }
    if (userData.goal === 'gain') { 
      calories += 500;
      goalText = 'GANAR MASA (+500 cal)';
    }

    const protein = weight * 2.2;
    const fats = (calories * 0.25) / 9;
    const carbs = (calories - protein * 4 - fats * 9) / 4;

    const plan = {
      calories: Math.round(calories),
      protein: Math.round(protein),
      fats: Math.round(fats),
      carbs: Math.round(carbs),
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalText: goalText,
      weight: weight,
      height: height,
      age: age,
      gender: userData.gender === 'male' ? 'Hombre' : 'Mujer',
      activityLevel: userData.activityLevel
    };

    setNutritionPlan(plan);
    setStep(6);
  };

  const generateMealPlan = () => {
    if (!nutritionPlan) return null;

    const caloriePerMeal = {
      desayuno: Math.round(nutritionPlan.calories * 0.25),
      snack_mañana: Math.round(nutritionPlan.calories * 0.10),
      almuerzo: Math.round(nutritionPlan.calories * 0.35),
      snack_tarde: Math.round(nutritionPlan.calories * 0.10),
      cena: Math.round(nutritionPlan.calories * 0.20),
    };

    const selectMeal = (mealType) => {
      const meals = mealDatabase[mealType];
      const target = caloriePerMeal[mealType];
      return meals.reduce((prev, curr) => 
        Math.abs(curr.calories - target) < Math.abs(prev.calories - target) ? curr : prev
      );
    };

    return {
      desayuno: selectMeal('desayuno'),
      snack_mañana: selectMeal('snack_mañana'),
      almuerzo: selectMeal('almuerzo'),
      snack_tarde: selectMeal('snack_tarde'),
      cena: selectMeal('cena'),
    };
  };

  const mealPlan = showMealPlan ? generateMealPlan() : null;

  const questions = [
    { field: 'age', label: '¿Cuál es tu edad?', type: 'number', placeholder: 'Ej: 25' },
    { field: 'weight', label: '¿Cuál es tu peso (kg)?', type: 'number', placeholder: 'Ej: 75' },
    { field: 'height', label: '¿Cuál es tu altura (cm)?', type: 'number', placeholder: 'Ej: 180' },
  ];

  const options = {
    gender: ['Hombre', 'Mujer'],
    goal: ['Perder Peso', 'Mantener', 'Ganar Masa'],
    activityLevel: ['Sedentario', 'Ligero', 'Moderado', 'Pesado', 'Muy Pesado'],
  };

  return (
    <div className={styles.aiContainer}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>❮</button>
        <h2>Asesor Nutricional IA</h2>
      </div>

      {step < 3 && (
        <div className={styles.questionCard}>
          <p className={styles.question}>{questions[step].label}</p>
          <input
            type={questions[step].type}
            placeholder={questions[step].placeholder}
            value={userData[questions[step].field]}
            onChange={(e) => handleInputChange(questions[step].field, e.target.value)}
            className={styles.input}
          />
          <Button onClick={() => userData[questions[step].field] && setStep(step + 1)} variant="primary">
            Siguiente
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className={styles.questionCard}>
          <p className={styles.question}>¿Cuál es tu género?</p>
          <div className={styles.optionsGrid}>
            {options.gender.map((opt, i) => (
              <button
                key={i}
                className={`${styles.optionBtn} ${userData.gender === opt.toLowerCase() ? styles.active : ''}`}
                onClick={() => {
                  handleInputChange('gender', opt.toLowerCase());
                  setStep(4);
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className={styles.questionCard}>
          <p className={styles.question}>¿Cuál es tu objetivo?</p>
          <div className={styles.optionsGrid}>
            {options.goal.map((opt, i) => (
              <button
                key={i}
                className={`${styles.optionBtn} ${userData.goal === opt.toLowerCase().replace(' ', '') ? styles.active : ''}`}
                onClick={() => {
                  handleInputChange('goal', opt.toLowerCase().replace(' ', ''));
                  setStep(5);
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 5 && (
        <div className={styles.questionCard}>
          <p className={styles.question}>¿Cuál es tu nivel de actividad?</p>
          <div className={styles.optionsGrid}>
            {options.activityLevel.map((opt, i) => (
              <button
                key={i}
                className={`${styles.optionBtn} ${userData.activityLevel === opt.toLowerCase().replace(' ', '') ? styles.active : ''}`}
                onClick={() => {
                  handleInputChange('activityLevel', opt.toLowerCase().replace(' ', ''));
                  calculateNutrition();
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 6 && nutritionPlan && !showMealPlan && (
        <div className={styles.resultsCard}>
          <h3>📊 Tu Plan Nutricional</h3>
          
          <div className={styles.infoBox}>
            <p><strong>Datos:</strong> {nutritionPlan.age} años | {nutritionPlan.weight}kg | {nutritionPlan.height}cm | {nutritionPlan.gender}</p>
            <p><strong>Objetivo:</strong> {nutritionPlan.goalText}</p>
          </div>

          <div className={styles.macroGrid}>
            <div className={styles.macroBox}>
              <span className={styles.macroLabel}>Calorías Diarias</span>
              <span className={styles.macroValue}>{nutritionPlan.calories}</span>
              <span className={styles.macroSubtext}>kcal/día</span>
            </div>
            <div className={styles.macroBox}>
              <span className={styles.macroLabel}>Proteína</span>
              <span className={styles.macroValue}>{nutritionPlan.protein}g</span>
              <span className={styles.macroSubtext}>{Math.round((nutritionPlan.protein * 4 / nutritionPlan.calories) * 100)}% calorías</span>
            </div>
            <div className={styles.macroBox}>
              <span className={styles.macroLabel}>Grasas</span>
              <span className={styles.macroValue}>{nutritionPlan.fats}g</span>
              <span className={styles.macroSubtext}>{Math.round((nutritionPlan.fats * 9 / nutritionPlan.calories) * 100)}% calorías</span>
            </div>
            <div className={styles.macroBox}>
              <span className={styles.macroLabel}>Carbohidratos</span>
              <span className={styles.macroValue}>{nutritionPlan.carbs}g</span>
              <span className={styles.macroSubtext}>{Math.round((nutritionPlan.carbs * 4 / nutritionPlan.calories) * 100)}% calorías</span>
            </div>
          </div>

          <div className={styles.detailsBox}>
            <p><strong>TMB:</strong> {nutritionPlan.bmr} kcal (calorías en reposo)</p>
            <p><strong>TDEE:</strong> {nutritionPlan.tdee} kcal (calorías totales diarias)</p>
          </div>

          <Button onClick={() => setShowMealPlan(true)} variant="primary">
            Ver Plan de Comidas
          </Button>
          <Button onClick={() => { setStep(0); setNutritionPlan(null); }} variant="secondary">
            Recalcular
          </Button>
        </div>
      )}

      {step === 6 && nutritionPlan && showMealPlan && mealPlan && (
        <div className={styles.mealPlanCard}>
          <h3>🍽️ Plan de Comidas Personalizado</h3>
          
          <div className={styles.mealSection}>
            <div className={styles.mealTime}>
              <h4>🌅 DESAYUNO ({mealPlan.desayuno.calories} cal)</h4>
              <p className={styles.mealName}>{mealPlan.desayuno.name}</p>
              <div className={styles.mealMacros}>
                <span>P: {mealPlan.desayuno.protein}g</span>
                <span>G: {mealPlan.desayuno.fats}g</span>
                <span>C: {mealPlan.desayuno.carbs}g</span>
              </div>
            </div>

            <div className={styles.mealTime}>
              <h4>🥤 SNACK MAÑANA ({mealPlan.snack_mañana.calories} cal)</h4>
              <p className={styles.mealName}>{mealPlan.snack_mañana.name}</p>
              <div className={styles.mealMacros}>
                <span>P: {mealPlan.snack_mañana.protein}g</span>
                <span>G: {mealPlan.snack_mañana.fats}g</span>
                <span>C: {mealPlan.snack_mañana.carbs}g</span>
              </div>
            </div>

            <div className={styles.mealTime}>
              <h4>🍽️ ALMUERZO ({mealPlan.almuerzo.calories} cal)</h4>
              <p className={styles.mealName}>{mealPlan.almuerzo.name}</p>
              <div className={styles.mealMacros}>
                <span>P: {mealPlan.almuerzo.protein}g</span>
                <span>G: {mealPlan.almuerzo.fats}g</span>
                <span>C: {mealPlan.almuerzo.carbs}g</span>
              </div>
            </div>

            <div className={styles.mealTime}>
              <h4>☕ SNACK TARDE ({mealPlan.snack_tarde.calories} cal)</h4>
              <p className={styles.mealName}>{mealPlan.snack_tarde.name}</p>
              <div className={styles.mealMacros}>
                <span>P: {mealPlan.snack_tarde.protein}g</span>
                <span>G: {mealPlan.snack_tarde.fats}g</span>
                <span>C: {mealPlan.snack_tarde.carbs}g</span>
              </div>
            </div>

            <div className={styles.mealTime}>
              <h4>🌙 CENA ({mealPlan.cena.calories} cal)</h4>
              <p className={styles.mealName}>{mealPlan.cena.name}</p>
              <div className={styles.mealMacros}>
                <span>P: {mealPlan.cena.protein}g</span>
                <span>G: {mealPlan.cena.fats}g</span>
                <span>C: {mealPlan.cena.carbs}g</span>
              </div>
            </div>
          </div>

          <div className={styles.totalMacros}>
            <h4>Total Diario</h4>
            <div className={styles.totalGrid}>
              <span>Calorías: {mealPlan.desayuno.calories + mealPlan.snack_mañana.calories + mealPlan.almuerzo.calories + mealPlan.snack_tarde.calories + mealPlan.cena.calories} kcal</span>
              <span>Proteína: {mealPlan.desayuno.protein + mealPlan.snack_mañana.protein + mealPlan.almuerzo.protein + mealPlan.snack_tarde.protein + mealPlan.cena.protein}g</span>
              <span>Grasas: {mealPlan.desayuno.fats + mealPlan.snack_mañana.fats + mealPlan.almuerzo.fats + mealPlan.snack_tarde.fats + mealPlan.cena.fats}g</span>
              <span>Carbos: {mealPlan.desayuno.carbs + mealPlan.snack_mañana.carbs + mealPlan.almuerzo.carbs + mealPlan.snack_tarde.carbs + mealPlan.cena.carbs}g</span>
            </div>
          </div>

          <Button onClick={() => setShowMealPlan(false)} variant="secondary">
            Volver a Macros
          </Button>
          <Button onClick={() => { setStep(0); setNutritionPlan(null); setShowMealPlan(false); }} variant="primary">
            Recalcular Plan
          </Button>
        </div>
      )}
    </div>
  );
};

export default NutritionAI;