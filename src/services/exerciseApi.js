// src/services/exerciseApi.js
import { exercises as localOverrides } from '../data/exercisesData';

const BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

let cachedExercises = null;

const muscleMap = {
  chest: ['chest'],
  back: ['middle back', 'lower back', 'lats', 'traps'],
  legs: ['quadriceps', 'hamstrings', 'calves', 'glutes'],
  biceps: ['biceps'],
  triceps: ['triceps'],
  hombro: ['shoulders'],
  abs: ['abdominals'],
  quads: ['quadriceps'],
  glutes: ['glutes']
};

// 🇪🇸 DICCIONARIO DE TRADUCCIÓN AUTOMÁTICA
const diccionarios = {
  musculos: {
    'abdominals': 'ABDOMINALES', 'hamstrings': 'ISQUIOTIBIALES', 'calves': 'PANTORRILLAS',
    'shoulders': 'HOMBROS', 'adductors': 'ADUCTORES', 'glutes': 'GLÚTEOS',
    'quadriceps': 'CUÁDRICEPS', 'biceps': 'BÍCEPS', 'forearms': 'ANTEBRAZOS',
    'obliques': 'OBLICUOS', 'triceps': 'TRÍCEPS', 'chest': 'PECHO',
    'lower back': 'ESPALDA BAJA', 'traps': 'TRAPECIOS', 'middle back': 'ESPALDA MEDIA',
    'lats': 'DORSALES', 'neck': 'CUELLO'
  },
  equipamiento: {
    'body only': 'SÓLO PESO CORPORAL', 'machine': 'MÁQUINA', 'kettlebells': 'PESA RUSA',
    'dumbbell': 'MANCUERNA', 'cable': 'POLEA', 'barbell': 'BARRA',
    'bands': 'BANDAS ELÁSTICAS', 'medicine ball': 'BALÓN MEDICINAL',
    'exercise ball': 'BALÓN SUIZO', 'e-z curl bar': 'BARRA Z', 'foam roll': 'RODILLO'
  }
};

export const fetchExercisesByMuscle = async (muscleId) => {
  const localData = localOverrides[muscleId] || [];
  const targetMuscles = muscleMap[muscleId];

  if (!targetMuscles) return localData;

  try {
    if (!cachedExercises) {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error("Error al descargar la base de datos");
      cachedExercises = await response.json();
    }

    const filteredApiData = cachedExercises.filter(ex => {
      return ex.primaryMuscles && ex.primaryMuscles.some(m => targetMuscles.includes(m));
    });

    const limitedData = filteredApiData.slice(0, 25);

    const formattedApiExercises = limitedData.map(apiEx => {
      const imgPath = apiEx.images && apiEx.images.length > 0 ? apiEx.images[0] : null;
      const imageUrl = imgPath ? `${IMAGE_BASE_URL}${imgPath}` : null;

      // Aplicamos la traducción al músculo y equipamiento
      const equipamientoEn = apiEx.equipment ? apiEx.equipment : 'body only';
      const musculoEn = apiEx.primaryMuscles && apiEx.primaryMuscles.length > 0 ? apiEx.primaryMuscles[0] : '';
      
      const equipamientoEs = diccionarios.equipamiento[equipamientoEn] || equipamientoEn.toUpperCase();
      const musculoEs = diccionarios.musculos[musculoEn] || musculoEn.toUpperCase();

      return {
        id: apiEx.id,
        apiNameOriginal: apiEx.name.replace(/_/g, ' ').toUpperCase(), // Guardamos el nombre en inglés
        name: apiEx.name.replace(/_/g, ' ').toUpperCase(), // Nombre por defecto si no lo traduces
        gif: imageUrl, 
        image: imageUrl, 
        description: `MÚSCULO PRINCIPAL: ${musculoEs} | EQUIPAMIENTO: ${equipamientoEs}.`,
        steps: apiEx.instructions || [], // Estos vienen en inglés de la API
        videoLink: null 
      };
    });

    // LA MAGIA: Fusión con tus modificaciones manuales
    const finalExercises = formattedApiExercises.map(apiEx => {
      const localMatch = localData.find(localEx => localEx.id === apiEx.id);
      if (localMatch) {
        // Si tú le pones un nombre en español, lo junta: "ENGLISH NAME - NOMBRE ESPAÑOL"
        const mergedName = localMatch.name 
          ? `${apiEx.apiNameOriginal} - ${localMatch.name.toUpperCase()}` 
          : apiEx.apiNameOriginal;
          
        return { ...apiEx, ...localMatch, name: mergedName }; 
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
    console.error("🚨 Error obteniendo ejercicios:", error);
    return localData; 
  }
};