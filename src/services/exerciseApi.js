// src/services/exerciseApi.js
import { exercises as localOverrides, hiddenExercises } from '../data/exercisesData';

const BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json';
const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

let cachedExercises = null;

const muscleMap = {
  chest:      ['chest'],
  back:       ['middle back', 'lower back', 'lats', 'traps'],
  legs:       ['quadriceps', 'hamstrings', 'calves', 'glutes'],
  biceps:     ['biceps'],
  triceps:    ['triceps'],
  hombro:     ['shoulders'],
  abs:        ['abdominals'],
  quads:      ['quadriceps'],
  glutes:     ['glutes'],
  forearms:   ['forearms'],
  neck:       ['neck'],
  hamstrings: ['hamstrings'],
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
      // 1. Si el ejercicio está en tu lista negra, lo eliminamos (return false)
      if (hiddenExercises && hiddenExercises.includes(ex.id)) {
        return false;
      }
      
      // 2. Si no está en la lista negra, revisamos que sea del músculo correcto
      return ex.primaryMuscles && ex.primaryMuscles.some(m => targetMuscles.includes(m));
    });

    const limitedData = filteredApiData.slice(0, 25);

    const formattedApiExercises = limitedData.map(apiEx => {
      const imgPath = apiEx.images && apiEx.images.length > 0 ? apiEx.images[0] : null;
      const imageUrl = imgPath ? `${IMAGE_BASE_URL}${imgPath}` : null;

      const equipamientoEn = apiEx.equipment ? apiEx.equipment : 'body only';
      const musculoEn = apiEx.primaryMuscles && apiEx.primaryMuscles.length > 0 ? apiEx.primaryMuscles[0] : '';
      
      const equipamientoEs = diccionarios.equipamiento[equipamientoEn] || equipamientoEn.toUpperCase();
      const musculoEs = diccionarios.musculos[musculoEn] || musculoEn.toUpperCase();

      return {
        id: apiEx.id,
        apiNameOriginal: apiEx.name.replace(/_/g, ' ').toUpperCase(), 
        name: apiEx.name.replace(/_/g, ' ').toUpperCase(), // Nombre por defecto si no lo traduces
        gif: imageUrl, 
        image: imageUrl, 
        description: `MÚSCULO PRINCIPAL: ${musculoEs} | EQUIPAMIENTO: ${equipamientoEs}.`,
        steps: apiEx.instructions || [], 
        videoLink: null 
      };
    });

    // LA MAGIA: Fusión con tus modificaciones manuales
    const finalExercises = formattedApiExercises.map(apiEx => {
      const localMatch = localData.find(localEx => localEx.id === apiEx.id);
      if (localMatch) {
        // 👇 AHORA SÍ: Si tú pusiste un nombre, usa SOLO el tuyo. Si no, usa el de la API.
        const finalName = localMatch.name ? localMatch.name.toUpperCase() : apiEx.apiNameOriginal;
          
        return { ...apiEx, ...localMatch, name: finalName }; 
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