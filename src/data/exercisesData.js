export const exerciseCategories = [
  { id: 'exercises', name: 'EJERCICIOS', image: '/img/ejer.webp' },
];
c
export const exerciseTypes = [
  { id: 'rugby', name: 'RUGBY', image: '/img/rugby.JPG' },
  { id: 'crossfit', name: 'CROSSFIT', image: '/img/cross.JFIF' },
  { id: 'gym', name: 'GYM', image: '/img/gym.webp' },
  { id: 'home', name: 'CASA', image: '/img/casa.JFIF' },
  { id: 'yoga', name: 'YOGA', image: '/img/yoga.JPG' },
];

export const muscleGroups = [
  { id: 'chest', name: 'PECHO', image: '/img/gym/pecho.JPG' },
  { id: 'biceps', name: 'BICEPS', image: '/img/gym/bicep.JPG' },
  { id: 'triceps', name: 'TRICEPS', image: '/img/gym/tricep.JPG' },
  { id: 'abs', name: 'ABDOMINALES', image: '/img//gym/abd.JPG' },
  { id: 'quads', name: 'CUADRICEPS', image: '/img/gym/cuadri.JPG' },
  { id: 'glutes', name: 'GLUTEOS', image: '/img/gym/gluteo2.JPG' },
  { id: 'legs', name: 'PIERNAS', image: '/img/gym/piernas2.JPG' },
  { id: 'back', name: 'ESPALDA', image: '/img/gym/espalda2.JPG' },
  { id: 'hombro', name: 'HOMBROS', image: '/img/gym/hombros.JPG' },
];

export const exercises = {
  biceps: [
    {
      id: 'bicep-curl',
      name: 'CURL DE BICEPS CON MANCUERNAS',
      image: '/img/gym/biceps/curl_mancuernasjpg.JPG',
      gif: '/img/gym/biceps/curl_mancuernas.gif', // Ejemplo de GIF
      description: [
        'El curl de bíceps es muy efectivo para desarrollar el músculo bíceps braquial, logrando brazos más fuertes y definidos.', 
        'Se puede realizar utilizando diferentes implementos como mancuernas, barras o bandas, adaptándose a distintos niveles de habilidad y preferencias.',
      ],
      steps: [
        'De pie, sostén una mancuerna en cada mano con las palmas hacia arriba.',
        'Brazos a la altura de los Hombros, gira y flexiona los brazos para levantar las mancuernas hacia los hombros.',
        'Contrae los bíceps en la parte superior del movimiento.',
        'Baja lentamente las mancuernas a la posición inicial..',
      ],
      videoLink: 'https://www.youtube.com/embed/e9nzjkmPRXY?feature=share', // Ejemplo de video de YouTube
    },
    {
      id: 'hammer-curl',
      name: 'Curl Martillo',
      image: 'https://via.placeholder.com/150/228B22/FFFFFF?text=Curl+Martillo',
      gif: 'https://media.giphy.com/media/3o7TKE52L2vjF1Yc0/giphy.gif',
      description: 'Variación del curl de bíceps que también trabaja los antebrazos.',
      steps: [
        'Sostén una mancuerna en cada mano con las palmas mirando hacia tu cuerpo (agarre neutro).',
        'Mantén los codos pegados y levanta las mancuernas hacia los hombros, manteniendo la posición de las palmas.',
        'Baja lentamente a la posición inicial.',
      ],
      videoLink: 'https://www.youtube.com/embed/zC3biU15Q5I',
    },
  ],
  chest: [
    {
      id: 'bench-press',
      name: 'Press de Banca',
      image: 'https://via.placeholder.com/150/4169E1/FFFFFF?text=Press+Banca',
      gif: 'https://media.giphy.com/media/l0MYJz2w22zG0c/giphy.gif',
      description: 'Ejercicio compuesto para desarrollar el pecho, hombros y tríceps.',
      steps: [
        'Acuéstate en un banco plano, con los pies apoyados en el suelo.',
        'Sostén la barra con un agarre un poco más ancho que los hombros.',
        'Baja la barra lentamente hacia el pecho, controlando el movimiento.',
        'Empuja la barra hacia arriba hasta extender los brazos, contrayendo el pecho.',
      ],
      videoLink: 'https://www.youtube.com/embed/rT7D-wS8rP4',
    },
  ],
  // Agrega más ejercicios para otros grupos musculares
};