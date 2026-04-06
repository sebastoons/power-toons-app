import React from 'react';
import Card from '../Shared/Card/Card';
import Button from '../Shared/Button/Button';
import styles from './MuscleGroups.module.css';
import { muscleGroups } from '../../data/exercisesData';

const MuscleGroups = ({ onSelectGroup, onBack }) => {
  return (
    <div className={styles.muscleGroupsContainer}>
      <div className={styles.modernHeader}>
        <button onClick={onBack} className={styles.backArrowBtn}>❮</button>
        <h2 className={styles.headerTitle}>MÚSCULOS A ENTRENAR</h2>
      </div>
      <h2 className={styles.title}>GRUPOS MUSCULARES</h2>
      <div className={styles.cardGrid}>
        {muscleGroups.map(group => (
          <Card
            key={group.id}
            title={group.name}
            image={group.image}
            onClick={() => onSelectGroup(group.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MuscleGroups;