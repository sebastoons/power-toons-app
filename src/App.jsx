import React, { useState } from 'react';
import Home from './components/Home/Home';
import ExerciseTypes from './components/ExerciseTypes/ExerciseTypes';
import MuscleGroups from './components/MuscleGroups/MuscleGroups';
import ExerciseList from './components/ExerciseList/ExerciseList';
import ExerciseModal from './components/ExerciseModal/ExerciseModal';
import './App.css'; // Para estilos globales

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'exerciseTypes', 'muscleGroups', 'exerciseList'
  const [selectedExerciseType, setSelectedExerciseType] = useState(null); // 'gym', 'rugby', etc.
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
    } else {
      // Si eliges otro tipo (ej: Rugby, Crossfit, Casa), podrías llevarlos directamente a una lista de ejercicios
      // Por ahora, solo Gym tiene grupos musculares anidados.
      // Para otros tipos, podrías tener una página ExerciseList con ejercicios filtrados por tipo.
      alert(`Has seleccionado: ${typeId.charAt(0).toUpperCase() + typeId.slice(1)}. Implementar lista de ejercicios para este tipo.`);
      setCurrentPage('home'); // Vuelve a Home por simplicidad del ejemplo
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

      {selectedExercise && (
        <ExerciseModal exercise={selectedExercise} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;