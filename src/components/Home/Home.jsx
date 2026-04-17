import React from 'react';
import Card from '../Shared/Card/Card';
import styles from './Home.module.css';
import { exerciseCategories } from '../../data/exercisesData';

const Home = ({ onSelectCategory, onOpenDashboard }) => {
  return (
    <div className={styles.homeContainer}>
      <img src="/3.svg" alt="Logo" className={styles.logo} /> 
      
      <div className={styles.cardGrid}>
        {exerciseCategories.map(category => (
          <Card
            key={category.id}
            title={category.name}
            image={category.image}
            onClick={() => onSelectCategory(category.id)}
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