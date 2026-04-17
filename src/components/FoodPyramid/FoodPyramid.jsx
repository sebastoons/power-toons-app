import React, { useState } from 'react';
import Button from '../Shared/Button/Button';
import styles from './FoodPyramid.module.css';
import { foodGroups } from '../../data/foodPyramidData';

const FoodPyramid = ({ onBack }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSelectGroup = (groupId) => {
    setSelectedGroup(selectedGroup === groupId ? null : groupId);
  };

  return (
    <div className={styles.pyramidContainer}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>❮</button>
        <h2>Pirámide Alimenticia 2026</h2>
      </div>

      {/* VISUAL DE PIRÁMIDE */}
      <div className={styles.pyramidVisual}>
        <div className={styles.pyramidLevels}>
          {/* NIVEL 5 - ACEITES Y GRASAS (TOP) */}
          <div 
            className={`${styles.level} ${styles.level5} ${selectedGroup === 'aceites' ? styles.active : ''}`}
            onClick={() => handleSelectGroup('aceites')}
          >
            <span className={styles.levelIcon}>🧈</span>
            <span className={styles.levelLabel}>Aceites & Grasas</span>
            <span className={styles.levelPortion}>Mínimo</span>
          </div>

          {/* NIVEL 4 - PROTEÍNAS Y LÁCTEOS */}
          <div className={styles.levelRow}>
            <div 
              className={`${styles.level} ${styles.level4} ${selectedGroup === 'proteinas' ? styles.active : ''}`}
              onClick={() => handleSelectGroup('proteinas')}
            >
              <span className={styles.levelIcon}>🍗</span>
              <span className={styles.levelLabel}>Proteínas</span>
              <span className={styles.levelPortion}>5-6.5 porciones</span>
            </div>
            <div 
              className={`${styles.level} ${styles.level4} ${selectedGroup === 'lacteos' ? styles.active : ''}`}
              onClick={() => handleSelectGroup('lacteos')}
            >
              <span className={styles.levelIcon}>🥛</span>
              <span className={styles.levelLabel}>Lácteos</span>
              <span className={styles.levelPortion}>2-3 porciones</span>
            </div>
          </div>

          {/* NIVEL 3 - FRUTAS Y VERDURAS */}
          <div className={styles.levelRow}>
            <div 
              className={`${styles.level} ${styles.level3} ${selectedGroup === 'frutas' ? styles.active : ''}`}
              onClick={() => handleSelectGroup('frutas')}
            >
              <span className={styles.levelIcon}>🍎</span>
              <span className={styles.levelLabel}>Frutas</span>
              <span className={styles.levelPortion}>2-4 porciones</span>
            </div>
            <div 
              className={`${styles.level} ${styles.level3} ${selectedGroup === 'verduras' ? styles.active : ''}`}
              onClick={() => handleSelectGroup('verduras')}
            >
              <span className={styles.levelIcon}>🥦</span>
              <span className={styles.levelLabel}>Verduras</span>
              <span className={styles.levelPortion}>3-5 porciones</span>
            </div>
          </div>

          {/* NIVEL 2 - CEREALES Y CARBOHIDRATOS */}
          <div className={styles.levelRow}>
            <div 
              className={`${styles.level} ${styles.level2} ${selectedGroup === 'cereales' ? styles.active : ''}`}
              onClick={() => handleSelectGroup('cereales')}
            >
              <span className={styles.levelIcon}>🌾</span>
              <span className={styles.levelLabel}>Cereales</span>
              <span className={styles.levelPortion}>6-8 porciones</span>
            </div>
          </div>

          {/* NIVEL 1 - AGUA (BASE) */}
          <div className={styles.level1}>
            <span className={styles.levelIcon}>💧</span>
            <span className={styles.levelLabel}>Agua</span>
            <span className={styles.levelPortion}>8 vasos/día</span>
          </div>
        </div>
      </div>

      {/* PANEL DE DETALLES */}
      {selectedGroup && (
        <div className={styles.detailsPanel}>
          <div className={styles.detailsContent}>
            <h3>{foodGroups[selectedGroup].name}</h3>
            <p className={styles.description}>{foodGroups[selectedGroup].description}</p>

            <div className={styles.benefitsBox}>
              <h4>💡 Beneficios:</h4>
              <ul>
                {foodGroups[selectedGroup].benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className={styles.foodsBox}>
              <h4>🍽️ Alimentos Incluidos:</h4>
              <div className={styles.foodsList}>
                {foodGroups[selectedGroup].foods.map((food, i) => (
                  <span key={i} className={styles.foodTag}>{food}</span>
                ))}
              </div>
            </div>

            <div className={styles.macrosBox}>
              <h4>📊 Macronutrientes Principales:</h4>
              <div className={styles.macrosGrid}>
                {foodGroups[selectedGroup].macros.map((macro, i) => (
                  <div key={i} className={styles.macroItem}>
                    <span className={styles.macroLabel}>{macro.name}</span>
                    <span className={styles.macroValue}>{macro.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.portionBox}>
              <h4>📏 Tamaño de Porción:</h4>
              <p>{foodGroups[selectedGroup].portion}</p>
            </div>

            <div className={styles.tipsBox}>
              <h4>💡 Consejos:</h4>
              <ul>
                {foodGroups[selectedGroup].tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* INFORMACIÓN GENERAL */}
      {!selectedGroup && (
        <div className={styles.infoPanel}>
          <h3>📚 Guía de Uso</h3>
          <p>Haz clic en cualquier nivel de la pirámide para ver:</p>
          <ul>
            <li>✅ Alimentos recomendados</li>
            <li>✅ Beneficios nutricionales</li>
            <li>✅ Macronutrientes principales</li>
            <li>✅ Tamaño de porción recomendado</li>
            <li>✅ Consejos de consumo</li>
          </ul>
        </div>
      )}

      <Button onClick={onBack} variant="secondary" className={styles.backButtonBottom}>
        Volver a Nutrición
      </Button>
    </div>
  );
};

export default FoodPyramid;