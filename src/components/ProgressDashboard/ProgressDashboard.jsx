import React, { useState, useEffect } from 'react';
import Button from '../Shared/Button/Button';
import styles from './ProgressDashboard.module.css';

const ProgressDashboard = ({ onBack }) => {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    exercisesTracked: 0,
    historyList: []
  });

  useEffect(() => {
    // Escanear el localStorage en busca de nuestros registros deportivos
    const loadDashboardData = () => {
      let totalSets = 0;
      let tracked = 0;
      const allHistory = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('exerciseData-')) {
          try {
            const data = JSON.parse(localStorage.getItem(key));
            if (data && data.length > 0) {
              tracked++;
              totalSets += data.length;
              
              // Extraer el nombre del ejercicio del ID (formateándolo un poco)
              const rawName = key.replace('exerciseData-', '').replace(/-/g, ' ');
              const exerciseName = rawName.toUpperCase();

              // Obtener el último registro (el más reciente)
              const lastRecord = data[data.length - 1];

              allHistory.push({
                id: key,
                name: exerciseName,
                lastDate: lastRecord.date,
                lastWeight: lastRecord.kgLb,
                lastSets: lastRecord.sets,
                lastReps: lastRecord.reps
              });
            }
          } catch (error) {
            console.error("Error leyendo datos del dashboard:", error);
          }
        }
      }

      // Ordenar alfabéticamente
      allHistory.sort((a, b) => a.name.localeCompare(b.name));

      setStats({
        totalWorkouts: totalSets,
        exercisesTracked: tracked,
        historyList: allHistory
      });
    };

    loadDashboardData();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>MI PROGRESO</h2>
        <Button onClick={onBack} variant="secondary">Volver al Inicio</Button>
      </div>

      {/* Tarjetas de Resumen (Métricas Clave) */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <h3>EJERCICIOS ACTIVOS</h3>
          <span className={styles.statNumber}>{stats.exercisesTracked}</span>
        </div>
        <div className={styles.summaryCard}>
          <h3>SERIES TOTALES</h3>
          <span className={styles.statNumber}>{stats.totalWorkouts}</span>
        </div>
      </div>

      {/* Lista de Últimos Récords */}
      <div className={styles.recordsSection}>
        <h3 className={styles.sectionTitle}>TUS MARCAS ACTUALES</h3>
        {stats.historyList.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Aún no hay datos. ¡Ve a entrenar y registra tus series!</p>
          </div>
        ) : (
          <div className={styles.recordsList}>
            {stats.historyList.map(item => (
              <div key={item.id} className={styles.recordCard}>
                <div className={styles.recordHeader}>
                  <h4>{item.name}</h4>
                  <span className={styles.dateBadge}>{new Date(item.lastDate).toLocaleDateString()}</span>
                </div>
                <div className={styles.recordStats}>
                  <div className={styles.statBox}>
                    <span className={styles.statLabel}>PESO</span>
                    <span className={styles.statValue}>{item.lastWeight}</span>
                  </div>
                  <div className={styles.statBox}>
                    <span className={styles.statLabel}>SETS x REPS</span>
                    <span className={styles.statValue}>{item.lastSets} x {item.lastReps}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressDashboard;