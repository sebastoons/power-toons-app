// src/components/Dashboard/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import Button from '../Shared/Button/Button';
import styles from './Dashboard.module.css';

const Dashboard = ({ onBack, onStartAICoach }) => {
  // Estado para almacenar los datos reales calculados
  const [realData, setRealData] = useState({
    maxWeight: { weight: 0, name: '-' },
    minWeight: { weight: 0, name: '-' },
    mostFrequent: { name: '-', count: 0 },
    lastWorkout: { date: '-', name: '-' },
    totalSeries: 0,
    hasData: false
  });

  // Este efecto escanea el historial real cada vez que abres el Dashboard
  useEffect(() => {
    let maxW = 0;
    let maxWName = '-';
    let minW = Infinity;
    let minWName = '-';
    let exerciseCounts = {};
    let allRecords = [];

    // 1. Escanear todo el localStorage buscando "exerciseData-"
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('exerciseData-')) {
        // Formateamos el ID para usarlo como nombre (ej: barbell_bench_press -> BARBELL BENCH PRESS)
        const exerciseId = key.replace('exerciseData-', '');
        const formattedName = exerciseId.replace(/_/g, ' ').toUpperCase();
        
        try {
          const history = JSON.parse(localStorage.getItem(key));
          if (Array.isArray(history) && history.length > 0) {
            exerciseCounts[formattedName] = history.length; // Contamos cuántas series tiene
            
            history.forEach(record => {
              allRecords.push({ ...record, name: formattedName });
              
              // Extraer solo los números del texto de peso (ej: "20kg" -> 20)
              const weightMatch = record.kgLb ? String(record.kgLb).match(/[\d.]+/) : null;
              if (weightMatch) {
                const weight = parseFloat(weightMatch[0]);
                if (weight > maxW) { maxW = weight; maxWName = formattedName; }
                if (weight > 0 && weight < minW) { minW = weight; minWName = formattedName; }
              }
            });
          }
        } catch(e) {
          console.error("Error leyendo historial:", e);
        }
      }
    }

    // 2. Procesar los resultados finales
    if (allRecords.length > 0) {
      // Ordenar por fecha (el más reciente primero)
      allRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
      const lastW = allRecords[0];

      // Encontrar el más frecuente
      let freqName = '-';
      let freqCount = 0;
      for (const [name, count] of Object.entries(exerciseCounts)) {
        if (count > freqCount) {
          freqCount = count;
          freqName = name;
        }
      }

      setRealData({
        maxWeight: { weight: maxW, name: maxWName },
        minWeight: { weight: minW !== Infinity ? minW : 0, name: minWName },
        mostFrequent: { name: freqName, count: freqCount },
        lastWorkout: { 
          // Formato de fecha legible
          date: new Date(lastW.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }), 
          name: lastW.name 
        },
        totalSeries: allRecords.length,
        hasData: true
      });
    }
  }, []);

  // Datos simulados para el mapa muscular (Fase 3)
  const muscleStatus = {
    pecho: realData.hasData ? 85 : 0, biceps: realData.hasData ? 70 : 0, 
    triceps: 40, hombros: 60, abdominales: 30, cuadriceps: 90, 
    espalda_alta: 50, gluteos: 80, pantorrillas: 20
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <Button onClick={onBack} variant="secondary">Volver Atrás</Button>
        <h1 className={styles.dashboardTitle}>Centro de Comando</h1>
      </div>

      <div className={styles.dashboardGrid}>
        
        {/* COLUMNA IZQUIERDA */}
        <div className={styles.leftColumn}>
          
          <div className={`${styles.dashboardCard} ${styles.welcomeCard}`}>
            <span className={styles.icon}>🔥</span>
            <div>
              <h3>Tu Actividad Diaria</h3>
              {/* Saludo personalizado */}
              <p>¡Hola, SebasToons! Es un buen momento para romper tus récords.</p>
            </div>
          </div>

          <div className={styles.dashboardCard}>
            <h3>Último Ejercicio Registrado:</h3>
            <div className={styles.lastWorkoutData}>
              <span className={styles.workoutDate}>{realData.lastWorkout.date}</span>
              <span className={styles.workoutMuscle}>{realData.lastWorkout.name}</span>
            </div>
          </div>

          <div className={styles.recordsGrid}>
            <div className={styles.dashboardCard}>
              <h3>💪 Peso más Alto:</h3>
              <p className={styles.recordValue}>{realData.maxWeight.weight} kg</p>
              <p style={{fontSize: '0.8em', color: '#aaa', margin: 0}}>{realData.maxWeight.name}</p>
            </div>
            <div className={styles.dashboardCard}>
              <h3>📉 Peso más Bajo (Record):</h3>
              <p className={styles.recordValue}>{realData.minWeight.weight} kg</p>
              <p style={{fontSize: '0.8em', color: '#aaa', margin: 0}}>{realData.minWeight.name}</p>
            </div>
          </div>
          
          <div className={styles.dashboardCard}>
            <h3>🔄 Más Frecuente últimamente:</h3>
            <p className={styles.frequentValue}>
              {realData.mostFrequent.name} <span>({realData.mostFrequent.count} series)</span>
            </p>
          </div>

          <div className={`${styles.dashboardCard} ${styles.coachAICard}`}>
            <span className={styles.coachIcon}>🤖</span>
            <div>
              <h3>AI Rutina Coach</h3>
              <p>Genera tu rutina inteligente basada en tu biblioteca de ejercicios y tiempo disponible.</p>
              <Button onClick={onStartAICoach} variant="primary" className={styles.coachBtn}>Consultar a la IA</Button>
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: MAPA MUSCULAR */}
        <div className={styles.rightColumn}>
          <div className={`${styles.dashboardCard} ${styles.muscleMapCard}`}>
            <h3>Estado Muscular Actual:</h3>
            <div className={styles.muscleMapWrapper}>
              
              <div className={styles.bodyFront}>
                <div className={`${styles.muscleGroup} ${styles.pecho}`} style={{ '--intensity': muscleStatus.pecho }}>Pectorales</div>
                <div className={`${styles.muscleGroup} ${styles.biceps}`} style={{ '--intensity': muscleStatus.biceps }}>Bíceps</div>
                <div className={`${styles.muscleGroup} ${styles.hombros}`} style={{ '--intensity': muscleStatus.hombros }}>Hombros</div>
                <div className={`${styles.muscleGroup} ${styles.abdominales}`} style={{ '--intensity': muscleStatus.abdominales }}>Abdominales</div>
                <div className={`${styles.muscleGroup} ${styles.cuadriceps}`} style={{ '--intensity': muscleStatus.cuadriceps }}>Cuádriceps</div>
              </div>

              <div className={styles.bodyBack}>
                <div className={`${styles.muscleGroup} ${styles.espaldaAltas}`} style={{ '--intensity': muscleStatus.espalda_alta }}>Espalda</div>
                <div className={`${styles.muscleGroup} ${styles.triceps}`} style={{ '--intensity': muscleStatus.triceps }}>Tríceps</div>
                <div className={`${styles.muscleGroup} ${styles.gluteos}`} style={{ '--intensity': muscleStatus.gluteos }}>Glúteos</div>
                <div className={`${styles.muscleGroup} ${styles.pantorrillas}`} style={{ '--intensity': muscleStatus.pantorrillas }}>Pantorrillas</div>
              </div>

            </div>
            <p className={styles.mapLegend}>Los colores más intensos indican grupos musculares entrenados recientemente o con récords vigentes.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;