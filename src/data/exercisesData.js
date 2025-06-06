export const exerciseCategories = [
  { id: 'exercises', name: 'EJERCICIOS', image: '/img/ejer.webp' },
];

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
      name: 'CURL CON MANCUERNAS DE PIE',
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
      id: 'curl-barra-z',
      name: 'CURL BARRA Z DE PIE',
      image: '/img/gym/biceps/curl_barra_zpng.png',
      gif: '/img/gym/biceps/curl_barra_z.gif',
      description: ['Es un ejercicio básico para ganar fuerza y músculo en los brazos.',
                    'La curvatura de la barra Z nos ayuda a trabajar las dos cabezas del bíceps (braquial y el braquiorradial), y el agarre curvo nos ayuda a prevenir lesiones en las muñecas.',
                    'Por eso es un ejercicio básico en tu rutina de entrenamiento.',
      ],
      steps: [
        'Colócate de pie con la barra sujetada con las palmas hacia arriba.',
        'Sube la barra hasta contraer al máximo los bíceps (fase concéntrica) sin mover los codos hacia al frente',
        'Baja la barra lentamente (fase excéntrica) hasta llegar a la posición inicial, exhala al bajar, y repetir.',
      ],
      videoLink: 'https://www.youtube.com/embed/no-dXip-rJM',
    },
    {
      id: 'curl-martillo',
      name: 'CURL MARTILLO CON MANCUERNAS',
      image: '/img/gym/biceps/curl_martillojpg.jpg',
      gif: '/img/gym/biceps/curl_martillo.gif',
      description: ['El curl de bíceps con agarre martillo es una de las variantes más conocidas del curl de bíceps.',
                   'Ejecutarlo es sumamente sencillo puesto que solo cambia la posición de nuestras muñecas.',
                   'No obstante, a nivel de activación de los flexores de codo, suceden cosas más interesantes. ',
      ],
      steps: [
        'De pie, con una mancuerna en cada mano, mantén los brazos extendidos a los lados del cuerpo, con las palmas mirando hacia tus muslos.',
        'Sin mover los brazos, dobla los codos y lleva las mancuernas hacia los hombros, manteniendo las palmas hacia adentro en todo momento.',
        'En la posición contraída, aprieta los músculos de los brazos durante un segundo y luego baja lentamente las mancuernas a la posición inicial.',
      ],
      videoLink: 'https://www.youtube.com/embed/Oat8Gwahvw4',
    },
  ],
  chest: [
    {
      id: 'press-banca-plano-barra',
      name: 'PRESS BANCA PLANO CON BARRA',
      image: '/img/gym/pecho/press_banca_planoj.jpg',
      gif: '/img/gym/pecho/cpress_banca_planog.gif',
      description: ['El press banca es el ejercicio de fuerza por excelencia y uno de los tres de las competiciones de powerlifting junto a la sentadilla y el peso muerto.',
                   'Se trata de un elemento básico para este tipo de entrenamiento pero, aunque se trate de un ejercicio esencial, es muy fácil caer en error a la hora de hacerlo.',
      ],
      steps: [
        'Mantén los pies bien apoyados en el suelo. Esto te proporciona una base estable, lo que te ayuda a mover más peso. Evita apoyar los pies sobre el banco, porque levantar los pies del suelo te restará estabilidad y aumentará el riesgo de lesión.',
        'Las barras olímpicas se dividen en secciones lisas y de agarre. Para saber cuál es el mejor ancho de agarre, coloca las puntas de los pulgares extendidos justo donde empieza la zona de agarre (la textura rugosa de la barra)',
        'Rodea la barra con los dedos y cierra el agarre con el pulgar. Los nudillos deben mirar hacia el techo.',
        'Evita que la barra se asiente en la palma de la mano, porque puede flexionar excesivamente las muñecas hacia atrás y producir dolor de muñeca en el futuro.',
        'Evita también el famoso agarre falso en el que, en lugar de cerrar el agarre con el pulgar, este se mantiene extendido por debajo de la barra. Este tipo de agarre puede aumentar el riesgo de lesión de muñeca.',
        'Baja la barra hasta la parte inferior del pecho/esternón, con los codos en un ángulo de unos 45 grados respecto al cuerpo',
        'Deja que la barra toque el pecho, extiende los brazos para levantar de nuevo la barra y contrae los pectorales en la parte alta del ejercicio.',
      ],
      videoLink: 'https://www.youtube.com/embed/ICaZxO7RmKs',
    },
  ],
  // Agrega más ejercicios para otros grupos musculares
};