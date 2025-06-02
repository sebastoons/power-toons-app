import React from 'react';
import Card from '../Shared/Card/Card';
import styles from './Home.module.css';
import { exerciseCategories } from '../../data/exercisesData';

const Home = ({ onSelectCategory }) => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Power Toons</h1>
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