import React from 'react';
import Card from '../Shared/Card/Card';
import styles from './Home.module.css';
import { exerciseCategories } from '../../data/exercisesData';

const Home = ({ onSelectCategory }) => {
  return (
    <div className={styles.homeContainer}>
      {/* Referenciamos el logo directamente desde la carpeta public */}
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
      </div>
    </div>
  );
};

export default Home;