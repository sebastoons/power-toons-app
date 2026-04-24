import React, { useState, useEffect, useCallback } from 'react';
import Home from './components/Home/Home';
import ExerciseTypes from './components/ExerciseTypes/ExerciseTypes';
import MuscleGroups from './components/MuscleGroups/MuscleGroups';
import BodyMap from './components/BodyMap/BodyMap';
import QuickTraining from './components/QuickTraining/QuickTraining';
import ExerciseList from './components/ExerciseList/ExerciseList';
import CrossfitList from './components/CrossfitList/CrossfitList'; 
import ExerciseModal from './components/ExerciseModal/ExerciseModal';
import Dashboard from './components/Dashboard/Dashboard'; 
import InfoModal from './components/InfoModal/InfoModal';
import Nutrition from './components/Nutrition/Nutrition';
import NutritionAI from './components/NutritionAI/NutritionAI';
import FoodPyramid from './components/FoodPyramid/FoodPyramid';
import './App.css'; 

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [selectedExerciseType, setSelectedExerciseType] = useState(null); 
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null); 
  const [selectedExercise, setSelectedExercise] = useState(null); 
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState('');

  const handleQuickTraining = () => setCurrentPage('quickTraining');

  const handleSelectCategory = (categoryId) => {
    if (categoryId === 'exercises') setCurrentPage('exerciseTypes');
    if (categoryId === 'nutrition') setCurrentPage('nutrition');
  };

  const handleOpenDashboard = () => setCurrentPage('dashboard');

  const handleSelectExerciseType = (typeId) => {
    setSelectedExerciseType(typeId);
    if (typeId === 'gym') {
      setCurrentPage('muscleGroups');
    } else if (typeId === 'crossfit') { 
      setCurrentPage('crossfitList');
      setSelectedMuscleGroup(null); 
    }
  };

  const handleSelectNutritionOption = (option) => {
    if (option === 'aiNutrition') {
      setCurrentPage('nutritionAI');
    } else if (option === 'foodPyramid') {
      setCurrentPage('foodPyramid');
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
    } else if (currentPage === 'quickTraining') {
      setCurrentPage('home');
    } else if (currentPage === 'dashboard') {
      setCurrentPage('home');
    } else if (currentPage === 'nutrition') {
      setCurrentPage('home');
    } else if (currentPage === 'nutritionAI') {
      setCurrentPage('nutrition');
    } else if (currentPage === 'foodPyramid') {
      setCurrentPage('nutrition');
    }
  }, [currentPage]);

  useEffect(() => {
    window.history.pushState({ page: currentPage }, '');
    const handlePopState = () => {
      if (currentPage !== 'home') {
        handleBack();
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage, handleBack]);

  return (
    <div className="App">
      {isInfoModalOpen && <InfoModal message={infoModalMessage} onClose={handleCloseInfoModal} />}
      {currentPage === 'home' && <Home onSelectCategory={handleSelectCategory} onOpenDashboard={handleOpenDashboard} onQuickTraining={handleQuickTraining} />}
      {currentPage === 'quickTraining' && <QuickTraining onSelectExercise={handleSelectExercise} onBack={handleBack} />}
      {currentPage === 'dashboard' && <Dashboard onBack={handleBack} onStartAICoach={() => alert("🤖 ¡Próximamente!")} />}
      {currentPage === 'nutrition' && <Nutrition onSelectOption={handleSelectNutritionOption} onBack={handleBack} />}
      {currentPage === 'foodPyramid' && <FoodPyramid onBack={handleBack} />}
      {currentPage === 'nutritionAI' && <NutritionAI onBack={handleBack} />}
      {currentPage === 'exerciseTypes' && <ExerciseTypes onSelectType={handleSelectExerciseType} onBack={handleBack} />}
      {currentPage === 'muscleGroups' && selectedExerciseType === 'gym' && (
        <BodyMap
          onSelectGroup={handleSelectMuscleGroup}
          onSelectExercise={handleSelectExercise}
          onBack={handleBack}
        />
      )}
      {currentPage === 'exerciseList' && selectedMuscleGroup && <ExerciseList muscleGroupId={selectedMuscleGroup} onSelectExercise={handleSelectExercise} onBack={handleBack} />}
      {currentPage === 'crossfitList' && selectedExerciseType === 'crossfit' && <CrossfitList onSelectExercise={handleSelectExercise} onBack={handleBack} />}
      {selectedExercise && <ExerciseModal exercise={selectedExercise} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;