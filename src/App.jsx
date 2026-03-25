// src/App.jsx

import React, { useState } from 'react';
import Home from './components/Home/Home';
import ExerciseTypes from './components/ExerciseTypes/ExerciseTypes';
import MuscleGroups from './components/MuscleGroups/MuscleGroups';
import ExerciseList from './components/ExerciseList/ExerciseList';
import CrossfitList from './components/CrossfitList/CrossfitList'; 
import ExerciseModal from './components/ExerciseModal/ExerciseModal';
import Dashboard from './components/Dashboard/Dashboard'; 
// 👇 Importamos el nuevo InfoModal 👇
import InfoModal from './components/InfoModal/InfoModal'; 
import './App.css'; // Para estilos globales

const App = () => {
  // Estado para la navegación de páginas
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'exerciseTypes', 'muscleGroups', 'exerciseList', 'crossfitList', 'dashboard'
  
  // Estado para las selecciones
  const [selectedExerciseType, setSelectedExerciseType] = useState(null); 
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null); 
  const [selectedExercise, setSelectedExercise] = useState(null); 

  // 👇 🔥 NUEVO ESTADO PARA EL INFOMODAL 🔥 👇
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState('');

  // Funciones de navegación
  const handleSelectCategory = (categoryId) => {
    if (categoryId === 'exercises') {
      setCurrentPage('exerciseTypes');
    }
  };

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
      // 👇 MODIFICADO: Reemplazamos el alert por nuestro modal custom 👇
      // 1. Preparamos el mensaje
      const typeName = typeId.charAt(0).toUpperCase() + typeId.slice(1);
      setInfoModalMessage(`Has seleccionado: ${typeName}. Actualmente, no tenemos una lista de ejercicios para este tipo. ¡Estamos trabajando para añadirla pronto!`);
      // 2. Abrimos el modal
      setIsInfoModalOpen(true);
      // No cambiamos la página inmediatamente, el modal lo hará al cerrarse
    }
  };

  // 👇 🔥 NUEVA FUNCIÓN PARA CERRAR EL INFOMODAL Y VOLVER A INICIO 🔥 👇
  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
    // Después de cerrar el modal, volvemos a 'home' como hacía tu alert original
    setCurrentPage('home');
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

  // Función placeholder para la IA que usaremos en el Dashboard
  const handleStartAICoach = () => {
    alert("🤖 ¡Próximamente! Estamos conectando con la inteligencia artificial de entrenamiento.");
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
    } else if (currentPage === 'dashboard') { 
      setCurrentPage('home');
    }
  };

  return (
    <div className="App">
      {/* 👇 🔥 RENDERIZAMOS EL INFOMODAL SI ESTÁ ABIERTO 🔥 👇 */}
      {isInfoModalOpen && (
        <InfoModal message={infoModalMessage} onClose={handleCloseInfoModal} />
      )}

      {currentPage === 'home' && (
        <Home 
          onSelectCategory={handleSelectCategory} 
          onOpenDashboard={handleOpenDashboard} 
        />
      )}

      {currentPage === 'dashboard' && ( 
        <Dashboard 
          onBack={handleBack} 
          onStartAICoach={handleStartAICoach}
        />
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