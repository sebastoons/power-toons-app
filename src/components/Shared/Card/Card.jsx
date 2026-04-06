import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, image, onClick, isSmallText = false }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={image} alt={title} className={styles.cardImage} />
      {/* Si isSmallText es true, aplica la clase adicional */}
      <h3 className={`${styles.cardTitle} ${isSmallText ? styles.smallTitle : ''}`}>
        {title}
      </h3>
    </div>
  );
};

export default Card;