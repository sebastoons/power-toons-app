import React, { useState } from 'react';
import Home from './components/Home/Home';
import ExerciseTypes from './components/ExerciseTypes/ExerciseTypes';
import MuscleGroups from './components/MuscleGroups/MuscleGroups';
import ExerciseList from './components/ExerciseList/ExerciseList';
import CrossfitList from './components/CrossfitList/CrossfitList'; 
import ExerciseModal from './components/ExerciseModal/ExerciseModal';
import ProgressDashboard from './components/ProgressDashboard/ProgressDashboard'; // ¡Nuevo import del Dashboard!
import './App.css'; // Para estilos globales

const App = () => {
  // Añadimos 'dashboard' como una posible página
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'exerciseTypes', 'muscleGroups', 'exerciseList', 'crossfitList', 'dashboard'
  const [selectedExerciseType, setSelectedExerciseType] = useState(null); // 'gym', 'rugby', 'crossfit', etc.
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null); // 'biceps', 'chest', etc.
  const [selectedExercise, setSelectedExercise] = useState(null); // Objeto del ejercicio para el modal

  // Funciones de navegación
  const handleSelectCategory = (categoryId) => {
    if (categoryId === 'exercises') {
      setCurrentPage('exerciseTypes');
    }
  };

  // ¡Nueva función para abrir el Dashboard!
  const handleOpenDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleSelectExerciseType = (typeId) => {
    setSelectedExerciseType(typeId);
    if (typeId === 'gym') {
      setCurrentPage('muscleGroups');
    } else if (typeId === 'crossfit') { 
      setCurrentPage('crossfitList');
      setSelectedMuscleGroup(null); 
    } else {
      alert(`Has seleccionado: ${typeId.charAt(0).toUpperCase() + typeId.slice(1)}. Implementar lista de ejercicios para este tipo.`);
      setCurrentPage('home'); 
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
    } else if (currentPage === 'crossfitList') { 
      setCurrentPage('exerciseTypes');
      setSelectedExerciseType(null);
    } else if (currentPage === 'dashboard') { // ¡Manejo del retroceso desde el Dashboard!
      setCurrentPage('home');
    }
  };

  return (
    <div className="App">
      {currentPage === 'home' && (
        <Home 
          onSelectCategory={handleSelectCategory} 
          onOpenDashboard={handleOpenDashboard} // Pasamos la prop al Home
        />
      )}

      {currentPage === 'dashboard' && ( // ¡Renderizamos el Dashboard!
        <ProgressDashboard onBack={handleBack} />
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

      {currentPage === 'crossfitList' && selectedExerciseType === 'crossfit' && ( 
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