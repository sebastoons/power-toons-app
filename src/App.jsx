// src/App.jsx

import React, { useState, useEffect, useCallback } from 'react';
import Home from './components/Home/Home';
import ExerciseTypes from './components/ExerciseTypes/ExerciseTypes';
import MuscleGroups from './components/MuscleGroups/MuscleGroups';
import ExerciseList from './components/ExerciseList/ExerciseList';
import CrossfitList from './components/CrossfitList/CrossfitList'; 
import ExerciseModal from './components/ExerciseModal/ExerciseModal';
import Dashboard from './components/Dashboard/Dashboard'; 
import InfoModal from './components/InfoModal/InfoModal'; 
import './App.css'; 

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [selectedExerciseType, setSelectedExerciseType] = useState(null); 
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null); 
  const [selectedExercise, setSelectedExercise] = useState(null); 
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState('');

  const handleSelectCategory = (categoryId) => {
    if (categoryId === 'exercises') setCurrentPage('exerciseTypes');
  };

  const handleOpenDashboard = () => setCurrentPage('dashboard');

  const handleSelectExerciseType = (typeId) => {
    setSelectedExerciseType(typeId);
    if (typeId === 'gym') {
      setCurrentPage('muscleGroups');
    } else if (typeId === 'crossfit') { 
      setCurrentPage('crossfitList');
      setSelectedMuscleGroup(null); 
    } else {
      const typeName = typeId.charAt(0).toUpperCase() + typeId.slice(1);
      setInfoModalMessage(`Has seleccionado: ${typeName}. Actualmente, no tenemos una lista de ejercicios para este tipo. ¡Estamos trabajando para añadirla pronto!`);
      setIsInfoModalOpen(true);
    }
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
    setCurrentPage('home');
  };

  const handleSelectMuscleGroup = (groupId) => {
    setSelectedMuscleGroup(groupId);
    setCurrentPage('exerciseList');
  };

  const handleSelectExercise = (exercise) => setSelectedExercise(exercise);
  const handleCloseModal = () => setSelectedExercise(null);
  const handleStartAICoach = () => alert("🤖 ¡Próximamente!");

  // Usamos useCallback para que useEffect pueda usar esta función de forma segura
  const handleBack = useCallback(() => {
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
    } else if (currentPage === 'dashboard') { 
      setCurrentPage('home');
    }
  }, [currentPage]);

  // 🔥 MAGIA: INTERCEPTAR EL BOTÓN DE ATRÁS DEL CELULAR 🔥
  useEffect(() => {
    // 1. Añadimos un registro ficticio al historial del celular
    window.history.pushState({ page: currentPage }, '');

    // 2. Esta función se dispara cuando el usuario toca "Atrás" en su celular
    const handlePopState = () => {
      if (currentPage !== 'home') {
        handleBack(); // Ejecuta tu lógica de navegación
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage, handleBack]);

  return (
    <div className="App">
      {isInfoModalOpen && <InfoModal message={infoModalMessage} onClose={handleCloseInfoModal} />}
      {currentPage === 'home' && <Home onSelectCategory={handleSelectCategory} onOpenDashboard={handleOpenDashboard} />}
      {currentPage === 'dashboard' && <Dashboard onBack={handleBack} onStartAICoach={handleStartAICoach} />}
      {currentPage === 'exerciseTypes' && <ExerciseTypes onSelectType={handleSelectExerciseType} onBack={handleBack} />}
      {currentPage === 'muscleGroups' && selectedExerciseType === 'gym' && <MuscleGroups onSelectGroup={handleSelectMuscleGroup} onBack={handleBack} />}
      
      {currentPage === 'exerciseList' && selectedMuscleGroup && (
        <ExerciseList muscleGroupId={selectedMuscleGroup} onSelectExercise={handleSelectExercise} onBack={handleBack} />
      )}

      {currentPage === 'crossfitList' && selectedExerciseType === 'crossfit' && ( 
        <CrossfitList onSelectExercise={handleSelectExercise} onBack={handleBack} />
      )}

      {selectedExercise && <ExerciseModal exercise={selectedExercise} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;