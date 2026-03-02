import React from 'react';
import Card from '../Shared/Card/Card';
import Button from '../Shared/Button/Button'; // Importamos tu componente Button
import styles from './Home.module.css';
import { exerciseCategories } from '../../data/exercisesData';

const Home = ({ onSelectCategory, onOpenDashboard }) => {
  return (
    <div className={styles.homeContainer}>
      <img src="/3.svg" alt="Logo" className={styles.logo} /> 
      
      {/* Nuevo botón para ir al Dashboard de Progreso */}
      <div style={{ width: '100%', maxWidth: '500px', marginBottom: '20px' }}>
        <Button onClick={onOpenDashboard} style={{ width: '100%', padding: '15px', fontSize: '1.1em', backgroundColor: '#001ba3' }}>
          📊 VER MI PROGRESO
        </Button>
      </div>

      <div className={styles.cardGrid}>
        {exerciseCategories.map(category => (
          <Card
            key={category.id}
            title={category.name}
            image={category.image}
            onClick={() => onSelectCategory(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;