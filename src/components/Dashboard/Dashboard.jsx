import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const Dashboard = ({ onBack }) => {
  const [stats, setStats] = useState({
    totalSeries: 0, uniqueExercises: 0,
    maxWeight: { val: 0, name: '-' },
    weekDays: Array(7).fill(0),
    topExercises: [], recentRecords: [], hasData: false,
  });
  const [lastRoutine, setLastRoutine] = useState(null);

  useEffect(() => {
    // Load saved routine
    try {
      const history = JSON.parse(localStorage.getItem('routineHistory') || '[]');
      if (history.length > 0) setLastRoutine(history[0]);
    } catch {}

    // Scan exercise history
    const allRecords = [];
    const exerciseCounts = {};
    let maxW = 0, maxWName = '-';

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith('exerciseData-')) continue;
      const name = key.replace('exerciseData-', '').replace(/_/g, ' ').toUpperCase();
      try {
        const history = JSON.parse(localStorage.getItem(key));
        if (Array.isArray(history) && history.length > 0) {
          exerciseCounts[name] = (exerciseCounts[name] || 0) + history.length;
          history.forEach(r => {
            allRecords.push({ ...r, name });
            const wm = r.kgLb ? String(r.kgLb).match(/[\d.]+/) : null;
            if (wm) { const w = parseFloat(wm[0]); if (w > maxW) { maxW = w; maxWName = name; } }
          });
        }
      } catch {}
    }

    if (!allRecords.length) return;
    allRecords.sort((a, b) => new Date(b.date) - new Date(a.date));

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const weekDays = Array(7).fill(0);
    allRecords.forEach(r => {
      const d = new Date(r.date); d.setHours(0, 0, 0, 0);
      const diff = Math.floor((today - d) / 86400000);
      if (diff >= 0 && diff < 7) weekDays[6 - diff]++;
    });

    const sorted = Object.entries(exerciseCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const maxCount = sorted[0]?.[1] || 1;
    const topExercises = sorted.map(([name, count]) => ({ name, count, pct: Math.round((count / maxCount) * 100) }));

    setStats({
      totalSeries: allRecords.length,
      uniqueExercises: Object.keys(exerciseCounts).length,
      maxWeight: { val: maxW, name: maxWName },
      weekDays, topExercises,
      recentRecords: allRecords.slice(0, 5),
      hasData: true,
    });
  }, []);

  const todayIdx  = new Date().getDay();
  const dayLabels = Array.from({ length: 7 }, (_, i) => DAYS[(todayIdx - 6 + i + 7) % 7]);
  const maxWeekVal = Math.max(...stats.weekDays, 1);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>❮</button>
        <h2 className={styles.headerTitle}>DASHBOARD</h2>
      </div>

      <div className={styles.body}>

        {/* Stats */}
        <div className={styles.statsRow}>
          {[
            { val: stats.totalSeries,      lbl: 'SERIES' },
            { val: `${stats.maxWeight.val}kg`, lbl: 'MAX PESO' },
            { val: stats.uniqueExercises,   lbl: 'EJERCICIOS' },
            { val: stats.weekDays.filter(d => d > 0).length, lbl: 'DÍAS/SEM' },
          ].map((s, i) => (
            <div key={i} className={styles.statCard}>
              <span className={styles.statVal}>{s.val}</span>
              <span className={styles.statLbl}>{s.lbl}</span>
            </div>
          ))}
        </div>

        {/* Weekly chart */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>ACTIVIDAD — ÚLTIMOS 7 DÍAS</p>
          <div className={styles.weekChart}>
            {stats.weekDays.map((count, i) => (
              <div key={i} className={styles.dayCol}>
                <span className={styles.dayCount}>{count > 0 ? count : ''}</span>
                <div className={styles.barWrap}>
                  <div className={`${styles.dayBar} ${count > 0 ? styles.dayBarActive : ''}`}
                    style={{ height: `${(count / maxWeekVal) * 100}%` }} />
                </div>
                <span className={styles.dayLabel}>{dayLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Last routine */}
        {lastRoutine && (
          <div className={styles.card}>
            <p className={styles.cardTitle}>ÚLTIMA RUTINA GUARDADA</p>
            <div className={styles.routineMeta}>
              <span className={styles.routineDate}>
                {new Date(lastRoutine.date).toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric' })}
              </span>
              <span className={styles.routineProgress}>
                {lastRoutine.doneCount}/{lastRoutine.totalCount} completados
              </span>
            </div>
            <div className={styles.routineProgressWrap}>
              <div className={styles.routineProgressBar}
                style={{ width: `${lastRoutine.totalCount ? (lastRoutine.doneCount / lastRoutine.totalCount) * 100 : 0}%` }} />
            </div>
            <div className={styles.routineList}>
              {lastRoutine.exercises.slice(0, 5).map((ex, i) => (
                <div key={i} className={`${styles.routineItem} ${ex.done ? styles.routineItemDone : ''}`}>
                  <span className={styles.routineCheck}>{ex.done ? '✓' : '○'}</span>
                  <span className={styles.routineExName}>{ex.name}</span>
                  <span className={styles.routineMuscle}>{ex.muscleName}</span>
                </div>
              ))}
              {lastRoutine.exercises.length > 5 && (
                <p className={styles.routineMore}>+{lastRoutine.exercises.length - 5} ejercicios más</p>
              )}
            </div>
          </div>
        )}

        {/* Top exercises */}
        {stats.topExercises.length > 0 && (
          <div className={styles.card}>
            <p className={styles.cardTitle}>TOP EJERCICIOS</p>
            {stats.topExercises.map((ex, i) => (
              <div key={i} className={styles.exRow}>
                <span className={styles.exRank}>{i + 1}</span>
                <div className={styles.exInfo}>
                  <span className={styles.exName}>{ex.name}</span>
                  <div className={styles.exBarWrap}>
                    <div className={styles.exBar} style={{ width: `${ex.pct}%` }} />
                  </div>
                </div>
                <span className={styles.exCount}>{ex.count}</span>
              </div>
            ))}
          </div>
        )}

        {/* Recent records */}
        {stats.recentRecords.length > 0 && (
          <div className={styles.card}>
            <p className={styles.cardTitle}>HISTORIAL RECIENTE</p>
            {stats.recentRecords.map((r, i) => (
              <div key={i} className={styles.recentRow}>
                <div className={styles.recentInfo}>
                  <span className={styles.recentName}>{r.name}</span>
                  <span className={styles.recentDate}>
                    {new Date(r.date).toLocaleDateString('es-ES', { day:'2-digit', month:'short' })}
                  </span>
                </div>
                <div className={styles.recentStats}>
                  {r.kgLb && <span className={styles.recentBadge}>{r.kgLb}</span>}
                  {r.reps && <span className={styles.recentBadge}>{r.reps} reps</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {!stats.hasData && !lastRoutine && (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>AÚN NO HAY DATOS</p>
            <p className={styles.emptySub}>Registra series en ejercicios o guarda una rutina para ver tus estadísticas.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
