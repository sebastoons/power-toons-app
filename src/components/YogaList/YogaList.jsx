import React, { useState, useEffect } from 'react';
import styles from './YogaList.module.css';
import { fetchYogaExercises } from '../../services/exerciseApi';

const DIFFICULTY_ORDER = ['Beginner', 'Intermediate', 'Expert'];

const YogaList = ({ onSelectExercise, onBack }) => {
  const [poses, setPoses]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');

  useEffect(() => {
    fetchYogaExercises().then(data => {
      setPoses(data);
      setLoading(false);
    });
  }, []);

  const categories = ['ALL', ...Array.from(new Set(poses.map(p => p.category))).sort()];
  const filtered = activeTab === 'ALL' ? poses : poses.filter(p => p.category === activeTab);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>❮</button>
        <h2 className={styles.headerTitle}>YOGA</h2>
      </div>

      {loading ? (
        <div className={styles.loadWrap}>
          <div className={styles.spin}/>
          <p className={styles.loadText}>CARGANDO POSTURAS...</p>
        </div>
      ) : (
        <>
          <div className={styles.tabs}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.tab} ${activeTab === cat ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat === 'ALL' ? 'TODAS' : cat.replace(' Yoga', '').toUpperCase()}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {filtered.map(pose => (
              <button key={pose.id} className={styles.card} onClick={() => onSelectExercise(pose)}>
                {pose.image
                  ? <img src={pose.image} alt={pose.name} className={styles.cardImg} onError={e => { e.target.style.display='none'; }} />
                  : <div className={styles.cardImgFallback} />
                }
                <div className={styles.cardBody}>
                  <p className={styles.cardName}>{pose.name}</p>
                  {pose.difficulty && (
                    <span className={`${styles.diffBadge} ${styles[pose.difficulty?.toLowerCase()] || ''}`}>
                      {pose.difficulty.toUpperCase()}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className={styles.empty}>Sin posturas en esta categoría.</p>
          )}
        </>
      )}
    </div>
  );
};

export default YogaList;
