// src/data/exercisesData.js

export const exerciseCategories = [
  { id: 'exercises', name: 'EJERCICIOS', image: '/img/ejer5.jpg' },
];

// Estas son las categorías principales (se mantienen igual)
export const exerciseTypes = [
  { id: 'rugby', name: 'RUGBY', image: '/img/rugby.jpg' },
  { id: 'crossfit', name: 'CROSSFIT', image: '/img/cros10.jpg' },
  { id: 'gym', name: 'GYM', image: '/img/gym.webp' },
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
      id: 'barbell_bench_press', // <- DEBE ser el ID exacto que trae la API
      name: 'PRESS BANCA PLANO CON BARRA', // Esto generará el título "BARBELL BENCH PRESS - PRESS BANCA PLANO..."
      //videoLink: 'https://www.youtube.com/embed/ICaZxO7RmKs', 
      image: '/img/gym/pecho/press_banca_plano_barra.jpg', // Reemplaza la imagen de la API
      gif: '/img/gym/pecho/press_banca_planog.gif', // Reemplaza el GIF de la API
      description: [
        'El press banca es el ejercicio de fuerza por excelencia.',
        'Se trata de un elemento básico para este tipo de entrenamiento.'
      ],
      steps: [
        'Mantén los pies bien apoyados en el suelo.',
        'Rodea la barra con los dedos y cierra el agarre con el pulgar.',
        'Baja la barra hasta la parte inferior del pecho/esternón.',
        'Empuja hacia arriba extendiendo los brazos.'
      ]
    },
    {
      id: 'barbell_incline_bench_press', 
      name: 'PRESS BANCA INCLINADO CON BARRA',
      //videoLink: 'https://www.youtube.com/embed/HImp2-LuihU',
      image: '/img/gym/pecho/press_banca_inclinado_barra.jpg',
      gif: '/img/gym/pecho/press_banca_inclinado_barrag.gif',
      description: 'El press de banca inclinado te permitirá apuntar mejor a la parte superior del pecho.',
      steps: [
        'Acuéstese sobre un banco inclinado.',
        'Inhala y deja que la barra descienda lentamente.',
        'Empuja la barra de regreso a la posición inicial.'
      ]
    },
    {
      id: 'Butterfly', 
      name: 'MARIPOSAS EN MAQUINA', 
      //videoLink: 'https://www.youtube.com/embed/NUiGkrwVIEo?si=yAQNlZ0gza3ViImV', 
      image: '/img/gym/pecho/butterfly.jpg', 
      gif: '/img/gym/pecho/butterflyg.gif', 
      description: [
        'Es un ejercicio de aislamiento enfocado en fortalecer y definir los pectorales, mejorando la postura mediante la retracción escapular.'
      ],
      steps: [
        'Siéntate en la máquina para aperturas, con la espalda recta y firmemente apoyada en el respaldo.',
        'Coloca los pies en el suelo y los codos y antebrazos en las almohadillas. Tus codos se deben flexionar en un ángulo de alrededor 90º.',
        'Contrae tus pectorales para juntar las almohadillas frente a tu pecho.',
        'Flexiona el pecho con fuerza en el momento del ejercicio en donde tus codos están juntos, luego vuelve a la posición inicial descendiendo el peso lentamente y manteniendo un estricto control del movimiento.'
      ]
    },
    {
      id: 'Decline_Dumbbell_Flyes', // Posible ID de la API para patada de tríceps
      name: 'APERTURA CON MANCUERNAS DECLINADO',
      image: '/img/gym/pecho/decline_dumbell_flyes.jpg',
      gif: '/img/gym/pecho/decline_dumbell_flyesg.gif',
      description: 'El ejercicio de aperturas con mancuernas en banco declinado es efectivo para trabajar la parte inferior de los músculos pectorales.',
      steps: [
        'Acuéstate en el banco con la cabeza más baja que las caderas.',
        'Extiende los brazos por encima del pecho con una ligera flexión en los codos. ',
        'Las mancuernas deben estar colocadas directamente sobre los hombros, con las palmas enfrentadas.',
        'Baja las mancuernas en un amplio arco hacia los lados, manteniendo una ligera flexión en los codos durante todo el movimiento.',
        'Continúa bajando las mancuernas hasta que los codos estén a la altura del pecho o ligeramente por debajo. Debes sentir un estiramiento en los músculos del pecho',
        'Eleva las mancuernas en un arco amplio, manteniendo una ligera flexión en los codos.',
        'Contrae los músculos del pecho en la parte superior del movimiento, llevando las mancuernas de vuelta a la posición inicial.'
      ]
    },
    {
      id: 'DECLINE_BARBELL_BENCH_PRESS', // Posible ID de la API para patada de tríceps
      name: 'PRESS BANCA DECLINADO CON BARRA',
      image: '/img/gym/pecho/DECLINE_BARBELL_BENCH_PRESS.jpg',
      gif: '/img/gym/pecho/DECLINE_BARBELL_BENCH_PRESSG.gif',
      description: 'El press de banca declinado es una variante del press de banca y se usa comúnmente para trabajar la parte inferior de los pectorales.',
      steps: [
        'Acuéstese en el banco declinado con la barra a la altura de la parte superior del pecho, sujetada con el soporte.',
        'Retrae los omóplatos.',
        'Extiende los brazos y sujeta la barra con las manos separadas al ancho de los hombros (o un poco más).',
        'Baja la barra de forma uniforme y controlada por encima del pecho, evitando que los codos se abran demasiado hacia afuera.',
        'Mantén los omóplatos juntos e inhala mientras bajas la barra.',
        'Realice el movimiento ascendente de forma limpia y rápida, exhalando al mismo tiempo.',
        'En la parte superior, mantén la tensión corporal, no extiendas completamente los brazos y repite el proceso',
      ]
    },
  ],

  // -------------------------
  // 🟦 BÍCEPS (BICEPS)
  // -------------------------
  biceps: [
    {
      id: 'dumbbell_bicep_curl', // Posible ID de la API para curl con mancuernas
      name: 'CURL CON MANCUERNAS DE PIE',
      //videoLink: 'https://www.youtube.com/embed/e9nzjkmPRXY?feature=share',
      image: '/img/gym/biceps/curl_mancuernasjpg.jpg',
      gif: '/img/gym/biceps/curl_mancuernas.gif',
      description: 'Muy efectivo para desarrollar el músculo bíceps braquial.',
      steps: [
        'De pie, sostén una mancuerna en cada mano con las palmas hacia arriba.',
        'Flexiona los brazos para levantar las mancuernas hacia los hombros.',
        'Baja lentamente a la posición inicial.'
      ]
    },
    {
      id: 'ez-bar_curl', // Posible ID de la API para curl con barra z
      name: 'CURL BARRA Z DE PIE',
      //videoLink: 'https://www.youtube.com/embed/no-dXip-rJM',
      image: '/img/gym/biceps/curl_barra_zpng.png',
      gif: '/img/gym/biceps/curl_barra_z.gif',
      description: 'La curvatura de la barra Z nos ayuda a trabajar las dos cabezas del bíceps.',
      steps: [
        'Sujeta la barra con las palmas hacia arriba.',
        'Sube la barra hasta contraer al máximo los bíceps.',
        'Baja la barra lentamente (fase excéntrica).'
      ]
    },
    {
      id: 'hammer_curl', // Posible ID de la API para curl martillo
      name: 'CURL MARTILLO CON MANCUERNAS',
      //videoLink: 'https://www.youtube.com/embed/Oat8Gwahvw4',
      image: '/img/gym/biceps/curl_martillojpg.jpg',
      gif: '/img/gym/biceps/curl_martillo.gif',
      description: 'Variante conocida para cambiar la activación del antebrazo.',
      steps: [
        'Mantén las palmas mirando hacia tu cuerpo (agarre neutro).',
        'Dobla los codos y lleva las mancuernas hacia los hombros.',
        'Baja lentamente.'
      ]
    }
  ],

  // -------------------------
  // 🟦 TRÍCEPS (TRICEPS)
  // -------------------------
  triceps: [
    {
      id: 'triceps_pushdown_-_rope_attachment', // Posible ID de la API para extensión en polea
      name: 'EXTENSIÓN DE TRÍCEPS EN POLEA CON CUERDA',
      //videoLink: 'https://www.youtube.com/embed/Mkd-G0XpnR0',
      image: '/img/gym/triceps/polea_cuerda.jpg',
      gif: '/img/gym/triceps/polea_cuerdag.gif',
      description: 'Ayuda a tonificar y fortalecer la parte posterior del brazo.',
      steps: [
        'Posiciónate frente a la máquina de polea.',
        'Agarra la cuerda con agarre neutro.',
        'Extiende tus brazos hacia abajo y regresa lentamente.'
      ]
    },
    {
      id: 'dumbbell_tricep_kickback', // Posible ID de la API para patada de tríceps
      name: 'PATADA TRÍCEPS CON MANCUERNA',
      //videoLink: 'https://www.youtube.com/embed/tZyWUViSqT4',
      image: '/img/gym/triceps/patada_trasera.jpg',
      gif: '/img/gym/triceps/patada_traserag.gif',
      description: 'Muy efectivo si se realiza manteniendo la espalda recta.',
      steps: [
        'Apoya tu pierna y brazo libre en un banco.',
        'Lleva el brazo hacia atrás contrayendo el tríceps.',
        'Vuelve con el brazo a la posición inicial.'
      ]
    }
  ]

  // Puedes ir agregando más músculos aquí abajo según los vayas necesitando (hombro, back, legs, etc.)
};