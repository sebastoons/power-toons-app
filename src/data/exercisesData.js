// src/data/exercisesData.js

export const exerciseCategories = [
  { id: 'exercises', name: 'EJERCICIOS', image: '/img/ejer5.jpg' },
];

// Estas son las categorías principales (se mantienen igual)
export const exerciseTypes = [
  { id: 'rugby', name: 'RUGBY', image: '/img/rugby.jpg' },
  { id: 'crossfit', name: 'CROSSFIT', image: '/img/cros10.jpg' },
  { id: 'gym', name: 'GYM', image: '/img/gym.jpg' },
  { id: 'yoga', name: 'YOGA', image: '/img/yoga.jpg' },
];

export const muscleGroups = [
  { id: 'chest', name: 'PECHO', image: '/img/gym/pecho.jpg' },
  { id: 'biceps', name: 'BICEPS', image: '/img/gym/bicep.jpg' },
  { id: 'triceps', name: 'TRICEPS', image: '/img/gym/tricep.jpg' },
  { id: 'abs', name: 'ABDOMINALES', image: '/img//gym/abd.jpg' },
  { id: 'quads', name: 'CUADRICEPS', image: '/img/gym/cuadri.jpg' },
  { id: 'glutes', name: 'GLUTEOS', image: '/img/gym/gluteo2.jpg' },
  { id: 'legs', name: 'PIERNAS', image: '/img/gym/piernas2.jpg' },
  { id: 'back', name: 'ESPALDA', image: '/img/gym/espalda2.jpg' },
  { id: 'hombro', name: 'HOMBROS', image: '/img/gym/hombros.jpg' },
];

// =========================================================================
// 🏋️‍♂️ BASE DE DATOS DE MODIFICACIONES (SOLO GYM)
// =========================================================================
/* INSTRUCCIONES PARA MODIFICAR UN EJERCICIO DE LA API:
  1. Abre la app y busca el ejercicio que quieres modificar.
  2. El 'id' de la API suele ser el nombre original en inglés con barras bajas (ej: 'barbell_bench_press').
  3. Crea un bloque de código abajo en su grupo muscular correspondiente (chest, biceps, etc).
  4. Pon ese 'id' exacto. 
  5. Agrega los campos que quieras cambiar. Si NO pones un campo (ej. no pones 'image'), usará el que trae la API por defecto.
*/

export const exercises = {
  // -------------------------
  // 🟦 PECHO (CHEST)
  // -------------------------
  chest: [
    {
      // EJEMPLO 1: Sobrescribiendo el Press de Banca de la API con tu info
      id: 'Barbell_Bench_Press', // <- DEBE ser el ID exacto que trae la API
      name: 'PRESS BANCA PLANO CON BARRA', // Esto generará el título "BARBELL BENCH PRESS - PRESS BANCA PLANO..."
      image: '/img/gym/pecho/press_banca_plano_barra.jpg', // Reemplaza la imagen de la API
      gif: '/img/gym/pecho/press_banca_planog.gif',
    },
    {
      id: 'Barbell_Incline_Bench_Press', 
      name: 'PRESS BANCA INCLINADO CON BARRA',
      image: '/img/gym/pecho/press_banca_inclinado_barra.jpg',
      gif: '/img/gym/pecho/press_banca_inclinado_barrag.gif',
    },
    {
      id: 'Butterfly', 
      name: 'MARIPOSAS EN MAQUINA', 
      image: '/img/gym/pecho/butterfly.jpg', 
      gif: '/img/gym/pecho/butterflyg.gif', 
    },
    {
      id: 'Decline_Dumbbell_Flyes', // Posible ID de la API para patada de tríceps
      name: 'APERTURA CON MANCUERNAS DECLINADO',
      image: '/img/gym/pecho/decline_dumbell_flyes.jpg',
      gif: '/img/gym/pecho/decline_dumbell_flyesg.gif',
    },
    {
      id: 'Decline_Barbell_Bench_Press', // Posible ID de la API para patada de tríceps
      name: 'PRESS BANCA DECLINADO CON BARRA',
      image: '/img/gym/pecho/DECLINE_BARBELL_BENCH_PRESS.jpg',
      gif: '/img/gym/pecho/DECLINE_BARBELL_BENCH_PRESSG.gif',
    },
    {
      id: 'Cable_Crossover', // Posible ID de la API para patada de tríceps
      name: 'CRUCES EN POLEA ALTA',
      image: '/img/gym/pecho/cable-crossover.jpg',
      gif: '/img/gym/pecho/cable-crossoverg.gif',
    },
  ],

  // -------------------------
  // 🟦 BÍCEPS (BICEPS)
  // -------------------------
  biceps: [
    {
      id: 'Dumbbell_Alternate_Bicep_Curl', // Posible ID de la API para curl con mancuernas
      name: 'CURL ALTERNO CON MANCUERNAS',
      image: '/img/gym/biceps/curl_mancuernasjpg.jpg',
      gif: '/img/gym/biceps/curl_mancuernas.gif',
    },
    {
      id: 'Barbell_Curl', // Posible ID de la API para curl con mancuernas
      name: 'CURL CON BARRA',
      image: '/img/gym/biceps/barbell_curl.jpg',
      gif: '/img/gym/biceps/barbell_curlg.gif',
    },
    {
      id: 'Alternate_Hammer_Curl', // Posible ID de la API para curl con mancuernas
      name: 'CURL DE MARTILLO ALTERNO',
      image: '/img/gym/biceps/alternate_hammer_curl.jpg',
      gif: '/img/gym/biceps/alternate_hammer_curlg.gif',
    },
    {
      id: 'Concentration_Curls', // Posible ID de la API para curl con mancuernas
      name: 'CURL CONCENTRADO',
      image: '/img/gym/biceps/concentration_curls.jpg',
      gif: '/img/gym/biceps/concentration_curlsg.gif',
    },
    {
      id: 'Dumbbell_Bicep_Curl', // Posible ID de la API para curl con mancuernas
      name: 'CURL CON MANCUERNAS',
      image: '/img/gym/biceps/dumbbell_bicep_curl.jpg',
      gif: '/img/gym/biceps/dumbbell_bicep_curlg.gif',
    },
    {
      id: 'Cable_Hammer_Curls_-_Rope_Attachment', // Posible ID de la API para curl con mancuernas
      name: 'CURL DE MARTILLO CON CUERDA EN POLEA',
      image: '/img/gym/biceps/cable_hammer_curls_rope_attachment.jpg',
      gif: '/img/gym/biceps/cable_hammer_curls_rope_attachmentg.gif',
    },
  ],

  // -------------------------
  // 🟦 TRÍCEPS (TRICEPS)
  // -------------------------
  triceps: [
    
  ]

  // Puedes ir agregando más músculos aquí abajo según los vayas necesitando (hombro, back, legs, etc.)
};