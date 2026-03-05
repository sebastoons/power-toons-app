// src/services/exerciseApi.js
import { exercises as localOverrides, apiMockData } from '../data/exercisesData';

const API_KEY = 'e2ccc22303msh9d648d694bfa133p136815jsne468543d2e7d'; 
const BASE_URL = 'https://exercisedb.p.rapidapi.com/exercises';

// 🔥 INTERRUPTOR: Cambia a 'false' cuando la API te quite el bloqueo 429
const USE_MOCK_DATA = true; 

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

const bodyPartMap = {
  chest: 'chest',
  back: 'back',
  legs: 'upper legs', 
  biceps: 'upper arms',
  triceps: 'upper arms',
  hombro: 'shoulders',
  abs: 'waist',
  quads: 'upper legs',
  glutes: 'upper legs'
};

export const fetchExercisesByMuscle = async (muscleId) => {
  const apiBodyPart = bodyPartMap[muscleId];
  const localData = localOverrides[muscleId] || [];
  
  if (!apiBodyPart) return localData;

  try {
    let apiData = [];

    if (USE_MOCK_DATA) {
      // Usamos los datos falsos para evitar el bloqueo 429
      console.log("Modo de desarrollo: Usando datos de prueba locales.");
      // Simulamos que la API nos responde filtrando solo el pecho por ahora
      if(apiBodyPart === 'chest') {
          apiData = apiMockData;
      }
    } else {
      // Llamada real a la API
      const response = await fetch(`${BASE_URL}/bodyPart/${apiBodyPart}?limit=20`, options);
      if (!response.ok) {
        throw new Error(`La API falló con código: ${response.status}`);
      }
      apiData = await response.json();
      if (!Array.isArray(apiData)) {
        throw new Error('La API no devolvió una lista de ejercicios válida.');
      }
    }

    let filteredApiData = apiData;
    if (muscleId === 'biceps') {
      filteredApiData = apiData.filter(ex => ex.target === 'biceps');
    } else if (muscleId === 'triceps') {
      filteredApiData = apiData.filter(ex => ex.target === 'triceps');
    }

    const formattedApiExercises = filteredApiData.map(apiEx => ({
      id: apiEx.id,
      name: apiEx.name.toUpperCase(),
      gif: apiEx.gifUrl,
      image: apiEx.gifUrl, 
      description: `Músculo objetivo principal: ${apiEx.target ? apiEx.target.toUpperCase() : 'N/A'}. Equipamiento: ${apiEx.equipment}.`,
      steps: apiEx.instructions || [],
      videoLink: null 
    }));

    const finalExercises = formattedApiExercises.map(apiEx => {
      const localMatch = localData.find(localEx => localEx.id === apiEx.id);
      if (localMatch) {
        return { ...apiEx, ...localMatch }; 
      }
      return apiEx;
    });

    localData.forEach(localEx => {
      if (!finalExercises.some(ex => ex.id === localEx.id)) {
        finalExercises.push(localEx);
      }
    });

    return finalExercises;

  } catch (error) {
    console.warn("Aviso: No se pudo cargar desde la API. Usando base de datos local.", error.message);
    return localData; 
  }
};