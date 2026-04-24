import React, { useState, useEffect, useCallback } from 'react';
import Home from './components/Home/Home';
import ExerciseTypes from './components/ExerciseTypes/ExerciseTypes';
import GymMode from './components/GymMode/GymMode';
import BodyMap from './components/BodyMap/BodyMap';
import RoutineBuilder from './components/RoutineBuilder/RoutineBuilder';
import ExerciseList from './components/ExerciseList/ExerciseList';
import CrossfitList from './components/CrossfitList/CrossfitList';
import ExerciseModal from './components/ExerciseModal/ExerciseModal';
import Dashboard from './components/Dashboard/Dashboard';
import InfoModal from './components/InfoModal/InfoModal';
import Nutrition from './components/Nutrition/Nutrition';
import NutritionAI from './components/NutritionAI/NutritionAI';
import QuickTraining from './components/QuickTraining/QuickTraining';
import ThemeToggle from './components/Shared/ThemeToggle/ThemeToggle';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage]           = useState('home');
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);
  const [selectedMuscleGroup, setSelectedMuscleGroup]   = useState(null);
  const [selectedExercise, setSelectedExercise]         = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen]           = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const handleQuickTraining    = () => setCurrentPage('quickTraining');
  const handleOpenDashboard    = () => setCurrentPage('dashboard');
  const handleSelectExercise   = (ex) => setSelectedExercise(ex);
  const handleCloseModal       = () => setSelectedExercise(null);
  const handleCloseInfoModal   = () => { setIsInfoModalOpen(false); setCurrentPage('home'); };

  const handleSelectCategory = (id) => {
    if (id === 'exercises') setCurrentPage('exerciseTypes');
    if (id === 'nutrition') setCurrentPage('nutrition');
  };

  const handleSelectExerciseType = (id) => {
    setSelectedExerciseType(id);
    if (id === 'gym')      setCurrentPage('gymMode');
    else if (id === 'crossfit') { setCurrentPage('crossfitList'); setSelectedMuscleGroup(null); }
  };

  const handleGymLibre  = () => setCurrentPage('muscleGroups');
  const handleGymRutina = () => setCurrentPage('routineBuilder');

  const handleSelectNutritionOption = (opt) => {
    if (opt === 'aiNutrition') setCurrentPage('nutritionAI');
  };

  const handleSelectMuscleGroup = (id) => {
    setSelectedMuscleGroup(id);
    setCurrentPage('exerciseList');
  };

  const handleBack = useCallback(() => {
    const map = {
      exerciseTypes:  'home',
      gymMode:        'exerciseTypes',
      muscleGroups:   'gymMode',
      routineBuilder: 'gymMode',
      exerciseList:   'muscleGroups',
      crossfitList:   'exerciseTypes',
      quickTraining:  'home',
      dashboard:      'home',
      nutrition:      'home',
      nutritionAI:    'nutrition',
    };
    const next = map[currentPage];
    if (!next) return;
    if (currentPage === 'gymMode')       setSelectedExerciseType(null);
    if (currentPage === 'muscleGroups')  { /* keep exerciseType for gymMode context */ }
    if (currentPage === 'exerciseList')  setSelectedMuscleGroup(null);
    if (currentPage === 'crossfitList')  setSelectedExerciseType(null);
    setCurrentPage(next);
  }, [currentPage]);

  useEffect(() => {
    window.history.pushState({ page: currentPage }, '');
    const onPop = () => { if (currentPage !== 'home') handleBack(); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [currentPage, handleBack]);

  return (
    <div className="App">
      <ThemeToggle />
      {isInfoModalOpen && <InfoModal onClose={handleCloseInfoModal} />}

      {currentPage === 'home'           && <Home onSelectCategory={handleSelectCategory} onOpenDashboard={handleOpenDashboard} onQuickTraining={handleQuickTraining} />}
      {currentPage === 'quickTraining'  && <QuickTraining onSelectExercise={handleSelectExercise} onBack={handleBack} />}
      {currentPage === 'dashboard'      && <Dashboard onBack={handleBack} />}
      {currentPage === 'nutrition'      && <Nutrition onSelectOption={handleSelectNutritionOption} onBack={handleBack} />}
      {currentPage === 'nutritionAI'    && <NutritionAI onBack={handleBack} />}
      {currentPage === 'exerciseTypes'  && <ExerciseTypes onSelectType={handleSelectExerciseType} onBack={handleBack} />}
      {currentPage === 'gymMode'        && <GymMode onLibre={handleGymLibre} onRutina={handleGymRutina} onBack={handleBack} />}
      {currentPage === 'muscleGroups'   && (
        <BodyMap onSelectGroup={handleSelectMuscleGroup} onSelectExercise={handleSelectExercise} onBack={handleBack} />
      )}
      {currentPage === 'routineBuilder' && (
        <RoutineBuilder onSelectExercise={handleSelectExercise} onBack={handleBack} />
      )}
      {currentPage === 'exerciseList'   && selectedMuscleGroup && (
        <ExerciseList muscleGroupId={selectedMuscleGroup} onSelectExercise={handleSelectExercise} onBack={handleBack} />
      )}
      {currentPage === 'crossfitList'   && selectedExerciseType === 'crossfit' && (
        <CrossfitList onSelectExercise={handleSelectExercise} onBack={handleBack} />
      )}
      {selectedExercise && <ExerciseModal exercise={selectedExercise} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
