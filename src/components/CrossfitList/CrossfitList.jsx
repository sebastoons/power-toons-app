import React, { useState, useEffect } from 'react';
import Card from '../Shared/Card/Card';
import styles from './CrossfitList.module.css';
import { crossfitExercises } from '../../data/crossfitExercises';
import { fetchKettlebellExercises } from '../../services/exerciseApi';

const CrossfitList = ({ onSelectExercise, onBack }) => {
  const [kettlebell, setKettlebell] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    fetchKettlebellExercises().then(exs => {
      setKettlebell(exs);
      setLoading(false);
    });
  }, []);

  const sorted = [...crossfitExercises].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.crossfitListContainer}>
      <div className={styles.modernHeader}>
        <button onClick={onBack} className={styles.backArrowBtn}>❮</button>
        <h2 className={styles.headerTitle}>CROSSFIT</h2>
      </div>

      <h2 className={styles.title}>EJERCICIOS CROSSFIT</h2>
      <div className={styles.cardGrid}>
        {sorted.map(ex => (
          <Card key={ex.id} title={ex.name} image={ex.image} onClick={() => onSelectExercise(ex)} />
        ))}
      </div>

      {loading ? (
        <p className={styles.loading}>Cargando kettlebells...</p>
      ) : kettlebell.length > 0 && (
        <>
          <h2 className={styles.title}>KETTLEBELL</h2>
          <div className={styles.cardGrid}>
            {kettlebell.map(ex => (
              <Card key={ex.id} title={ex.name} image={ex.image} onClick={() => onSelectExercise(ex)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CrossfitList;
