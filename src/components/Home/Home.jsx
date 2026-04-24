import React from 'react';
import Card from '../Shared/Card/Card';
import styles from './Home.module.css';
import { exerciseCategories } from '../../data/exercisesData';

const Home = ({ onSelectCategory, onOpenDashboard, onQuickTraining }) => {
  return (
    <div className={styles.homeContainer}>
      <img src="/3.svg" alt="Logo" className={styles.logo} />

      <div className={styles.cardGrid}>
        {/* Quick Training AI — destacado */}
        <div className={styles.quickCard} onClick={onQuickTraining}>
          <span className={styles.quickIcon}>⚡</span>
          <div className={styles.quickInfo}>
            <p className={styles.quickTitle}>ENTRENAMIENTO RÁPIDO</p>
            <p className={styles.quickSub}>IA · Plan personalizado en segundos</p>
          </div>
          <span className={styles.quickArrow}>›</span>
        </div>

        {exerciseCategories.map(cat => (
          <Card
            key={cat.id}
            title={cat.name}
            image={cat.image}
            onClick={() => onSelectCategory(cat.id)}
          />
        ))}

        <Card
          title="MI PROGRESO"
          image="/img/progreso.jpg"
          onClick={onOpenDashboard}
        />
      </div>
    </div>
  );
};

export default Home;
