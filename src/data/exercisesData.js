export const exerciseCategories = [
  { id: 'exercises', name: 'EJERCICIOS', image: '/img/ejer5.jpg' },
  { id: 'nutrition', name: 'NUTRICIÓN', image: '/img/nutrition.jpg' },
];

export const exerciseTypes = [
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

export const hiddenExercises = [
  'Behind_Head_Chest_Stretch',
  'Chain_Press', 
  'ab_roller'
];

export const exercises = {
  chest: [
    {
      id: 'Barbell_Bench_Press',
      name: 'PRESS BANCA PLANO CON BARRA',
      image: '/img/gym/pecho/press_banca_plano_barra.jpg',
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
      id: 'Decline_Dumbbell_Flyes',
      name: 'APERTURA CON MANCUERNAS DECLINADO',
      image: '/img/gym/pecho/decline_dumbell_flyes.jpg',
      gif: '/img/gym/pecho/decline_dumbell_flyesg.gif',
    },
    {
      id: 'Decline_Barbell_Bench_Press',
      name: 'PRESS BANCA DECLINADO CON BARRA',
      image: '/img/gym/pecho/DECLINE_BARBELL_BENCH_PRESS.jpg',
      gif: '/img/gym/pecho/DECLINE_BARBELL_BENCH_PRESSG.gif',
    },
    {
      id: 'Cable_Crossover',
      name: 'CRUCES EN POLEA ALTA',
      image: '/img/gym/pecho/cable-crossover.jpg',
      gif: '/img/gym/pecho/cable-crossoverg.gif',
    },
  ],

  biceps: [
    {
      id: 'Dumbbell_Alternate_Bicep_Curl',
      name: 'CURL ALTERNO CON MANCUERNAS',
      image: '/img/gym/biceps/curl_mancuernasjpg.jpg',
      gif: '/img/gym/biceps/curl_mancuernas.gif',
    },
    {
      id: 'Barbell_Curl',
      name: 'CURL CON BARRA',
      image: '/img/gym/biceps/barbell_curl.jpg',
      gif: '/img/gym/biceps/barbell_curlg.gif',
    },
    {
      id: 'Alternate_Hammer_Curl',
      name: 'CURL DE MARTILLO ALTERNO',
      image: '/img/gym/biceps/alternate_hammer_curl.jpg',
      gif: '/img/gym/biceps/alternate_hammer_curlg.gif',
    },
    {
      id: 'Concentration_Curls',
      name: 'CURL CONCENTRADO',
      image: '/img/gym/biceps/concentration_curls.jpg',
      gif: '/img/gym/biceps/concentration_curlsg.gif',
    },
    {
      id: 'Dumbbell_Bicep_Curl',
      name: 'CURL CON MANCUERNAS',
      image: '/img/gym/biceps/dumbbell_bicep_curl.jpg',
      gif: '/img/gym/biceps/dumbbell_bicep_curlg.gif',
    },
    {
      id: 'Cable_Hammer_Curls_-_Rope_Attachment',
      name: 'CURL DE MARTILLO CON CUERDA EN POLEA',
      image: '/img/gym/biceps/cable_hammer_curls_rope_attachment.jpg',
      gif: '/img/gym/biceps/cable_hammer_curls_rope_attachmentg.gif',
    },
  ],

  triceps: [],
  shoulders: [
    {
      id: 'Barbell_Shoulder_Press',
      name: 'PRESS DE HOMBRO CON BARRA',
      image: '/img/gym/biceps/Barbell_Shoulder_Press.jpg',
      gif: '/img/gym/biceps/Barbell_Shoulder_Pressg.gif',
    },
  ],
  quads: [
    {
      id: 'Barbell_Full_Squat',
      name: 'SENTADILLA CON BARRA',
      image: '/img/gym/biceps/Barbell_Full_Squat.jpg',
      gif: '/img/gym/biceps/Barbell_Full_Squatg.gif',
    },
  ]
};