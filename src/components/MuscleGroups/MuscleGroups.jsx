import React from 'react';
import Card from '../Shared/Card/Card';
import Button from '../Shared/Button/Button';
import styles from './MuscleGroups.module.css';
import { muscleGroups } from '../../data/exercisesData';

const MuscleGroups = ({ onSelectGroup, onBack }) => {
  return (
    <div className={styles.muscleGroupsContainer}>
      <div className={styles.buttonContainer}> {/* Nuevo contenedor para el botón */}
        <Button onClick={onBack}>Volver Atrás</Button>
      </div>
      <h2 className={styles.title}>Grupos Musculares (Gym)</h2>
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