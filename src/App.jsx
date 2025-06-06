// src/App.jsx

import React, { useState } from 'react';
import Home from './components/Home/Home';
import ExerciseTypes from './components/ExerciseTypes/ExerciseTypes';
import MuscleGroups from './components/MuscleGroups/MuscleGroups';
import ExerciseList from './components/ExerciseList/ExerciseList';
import CrossfitList from './components/CrossfitList/CrossfitList'; // ¡Nuevo import!
import ExerciseModal from './components/ExerciseModal/ExerciseModal';
import './App.css'; // Para estilos globales

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'exerciseTypes', 'muscleGroups', 'exerciseList', 'crossfitList'
  const [selectedExerciseType, setSelectedExerciseType] = useState(null); // 'gym', 'rugby', 'crossfit', etc.
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null); // 'biceps', 'chest', etc.
  const [selectedExercise, setSelectedExercise] = useState(null); // Objeto del ejercicio para el modal

  // Funciones de navegación
  const handleSelectCategory = (categoryId) => {
    if (categoryId === 'exercises') {
      setCurrentPage('exerciseTypes');
    }
    // Puedes expandir esto para otras categorías si las añades en Home
  };

  const handleSelectExerciseType = (typeId) => {
    setSelectedExerciseType(typeId);
    if (typeId === 'gym') {
      setCurrentPage('muscleGroups');
    } else if (typeId === 'crossfit') { // ¡Maneja Crossfit aquí!
      setCurrentPage('crossfitList');
      setSelectedMuscleGroup(null); // Asegúrate de limpiar cualquier grupo muscular seleccionado previamente
    } else {
      // Para otros tipos (Rugby, Casa, Yoga) que no tienen grupos musculares,
      // puedes llevarlos a una lista de ejercicios directa (similar a CrossfitList)
      // Por ahora, para simplificar y no romper tu lógica existente:
      alert(`Has seleccionado: ${typeId.charAt(0).toUpperCase() + typeId.slice(1)}. Implementar lista de ejercicios para este tipo.`);
      setCurrentPage('home'); // Vuelve a Home o a ExerciseTypes
    }
  };

  const handleSelectMuscleGroup = (groupId) => {
    setSelectedMuscleGroup(groupId);
    setCurrentPage('exerciseList');
  };

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleCloseModal = () => {
    setSelectedExercise(null);
  };

  const handleBack = () => {
    if (currentPage === 'exerciseTypes') {
      setCurrentPage('home');
    } else if (currentPage === 'muscleGroups') {
      setCurrentPage('exerciseTypes');
      setSelectedExerciseType(null);
    } else if (currentPage === 'exerciseList') {
      setCurrentPage('muscleGroups');
      setSelectedMuscleGroup(null);
    } else if (currentPage === 'crossfitList') { // ¡Maneja el botón de retroceso para Crossfit!
      setCurrentPage('exerciseTypes');
      setSelectedExerciseType(null);
    }
  };

  return (
    <div className="App">
      {currentPage === 'home' && (
        <Home onSelectCategory={handleSelectCategory} />
      )}

      {currentPage === 'exerciseTypes' && (
        <ExerciseTypes onSelectType={handleSelectExerciseType} onBack={handleBack} />
      )}

      {currentPage === 'muscleGroups' && selectedExerciseType === 'gym' && (
        <MuscleGroups onSelectGroup={handleSelectMuscleGroup} onBack={handleBack} />
      )}

      {currentPage === 'exerciseList' && selectedMuscleGroup && (
        <ExerciseList
          muscleGroupId={selectedMuscleGroup}
          onSelectExercise={handleSelectExercise}
          onBack={handleBack}
        />
      )}

      {currentPage === 'crossfitList' && selectedExerciseType === 'crossfit' && ( // ¡Renderiza CrossfitList!
        <CrossfitList
          onSelectExercise={handleSelectExercise}
          onBack={handleBack}
        />
      )}

      {selectedExercise && (
        <ExerciseModal exercise={selectedExercise} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;