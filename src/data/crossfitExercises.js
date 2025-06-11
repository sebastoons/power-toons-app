// src/data/crossfitExercises.js

export const crossfitExercises = [
  {
    id: 'Barbell-clean-and-push',
    name: 'BARBELL CLEAN AND PUSH',
    image: '/img/cross/barbell_clean_and_push.jpg',
    gif: '/img/cross/barbell_clean_and_pressg.webp',
    description: [
      'es un excelente movimiento de cuerpo completo para desarrollar músculo, aumentar la fuerza y ​​desarrollar explosividad en actividades atléticas.',
      'De hecho, la primera parte del movimiento (clean and jerk) es en realidad la primera parte de uno de los dos levantamientos de halterofilia (clean and jerk).',
    ],
    steps: [
      'Comienza con los pies debajo de las caderas. Flexiona las caderas y sujeta la barra a la altura de los hombros, con las palmas hacia ti.',
      'Mantenga la espalda plana y el pecho levantado con el centro del cuerpo contraído.',
      'Levanta la barra del suelo explosivamente hasta que casi toque las espinillas.',
      'Mueva las caderas hacia adelante y tire con fuerza de la barra directamente hacia arriba encogiendo los hombros, de modo que la barra se desplace cerca de su cuerpo hasta la posición de rack frontal con los codos levantados.',
      'Desde la posición de rack frontal, flexiona levemente las rodillas y empuja con los talones para que la barra se desplace a la posición sobre la cabeza con los brazos rectos.',
      'Invierta el movimiento hasta llegar al suelo.',
    ],
    videoLink: 'https://www.youtube.com//embed/K1QPQBVbTKM',
    // --- NUEVO: Variantes para BARBELL CLEAN AND PUSH ---
    variants: [
      {
        id: 'barbell-clean-and-jerk',
        name: 'BARBELL CLEAN AND JERK (Variante Avanzada)',
        image: '/img/cross/barbell_clean_and_jerk.jpg', // Nueva imagen para la variante
        gif: '/img/cross/barbell_clean_and_jerk_gif.gif', // Nuevo GIF para la variante
        description: [
          'Esta variante es un levantamiento olímpico completo, que requiere mayor coordinación, fuerza y técnica. Es una progresión del Clean and Push.',
          'Se enfoca en la transición fluida del Clean a la posición de rack y luego un Jerk explosivo para llevar la barra sobre la cabeza.',
        ],
        steps: [
          'Realiza el Clean (tirón desde el suelo hasta el rack frontal) como en el ejercicio base.',
          'Desde la posición de rack frontal, realiza un "dip" (flexión ligera de rodillas) y un "drive" explosivo con las piernas para impulsar la barra hacia arriba.',
          'Mientras la barra sube, realiza un "split jerk" (separación de las piernas, una adelante y otra atrás) o "push jerk" (ambas piernas juntas) para meterte debajo de la barra con los brazos extendidos.',
          'Estabiliza la barra sobre la cabeza, con los brazos bloqueados y el cuerpo extendido.',
          'Recupera la posición de pie, juntando los pies, y baja la barra con control.',
        ],
        videoLink: 'https://www.youtube.com/embed/no-dXip-rJM3', // Enlace de video para la variante
      },
      {
        id: 'power-clean',
        name: 'POWER CLEAN (Variante Intermedia)',
        image: '/img/cross/power_clean.jpg', // Nueva imagen para la variante
        gif: '/img/cross/power_clean_gif.gif', // Nuevo GIF para la variante
        description: [
          'El Power Clean es una variante del Clean and Push donde la barra se recibe en una posición de sentadilla parcial, no completa.',
          'Es un excelente ejercicio para desarrollar potencia y explosividad de la cadena posterior sin la complejidad de la sentadilla completa de un Clean.',
        ],
        steps: [
          'Inicia como el Clean and Push.',
          'Levanta la barra explosivamente, pero en lugar de recibirla en sentadilla profunda, recíbela en una sentadilla parcial (por encima del paralelo).',
          'Asegúrate de que tus codos estén altos y la barra descanse sobre tus hombros en la posición de rack frontal.',
          'Ponte de pie completamente con la barra en la posición de rack.',
          'Baja la barra con control.',
        ],
        videoLink: 'https://www.youtube.com/embed/no-dXip-rJM4', // Enlace de video para la variante
      },
    ],
  },
  {
    id: 'burpees',
    name: 'BURPEES',
    image: '/img/crossfit/burpees.jpg',
    gif: '/img/crossfit/burpees.gif',
    description: [
      'El burpee es un ejercicio de cuerpo completo muy popular en CrossFit, que combina una sentadilla, una plancha, una flexión y un salto.',
      'Es excelente para mejorar la resistencia cardiovascular, la fuerza muscular y la agilidad.',
    ],
    steps: [
      'Comienza de pie con los pies a la anchura de los hombros.',
      'Agáchate y coloca las manos en el suelo frente a ti, a la altura de los hombros.',
      'Impulsa los pies hacia atrás para adoptar una posición de plancha alta.',
      'Realiza una flexión de brazos, llevando el pecho al suelo.',
      'Impulsa los pies de nuevo hacia las manos, volviendo a la posición de sentadilla inicial.',
      'Levántate rápidamente y realiza un salto vertical, aplaudiendo con las manos por encima de la cabeza.',
    ],
    videoLink: 'https://www.youtube.com/watch?v=dZgBgkU6xT4',
    // --- NUEVO: Variantes para BURPEES ---
    variants: [
      {
        id: 'burpees-no-pushup',
        name: 'BURPEES SIN FLEXIÓN',
        image: '/img/crossfit/burpees_no_pushup.jpg', // Nueva imagen
        gif: '/img/crossfit/burpees_no_pushup.gif', // Nuevo GIF
        description: [
          'Esta es una versión modificada del burpee original, ideal para principiantes o para sesiones de alta repetición.',
          'Se reduce la dificultad al eliminar la flexión de brazos, manteniendo la intensidad cardiovascular.',
        ],
        steps: [
          'Comienza de pie, agáchate y coloca las manos en el suelo.',
          'Impulsa los pies hacia atrás a la posición de plancha alta.',
          'Salta con los pies hacia las manos y levántate rápidamente, terminando con un salto y aplauso por encima de la cabeza.',
        ],
        videoLink: 'https://www.youtube.com/embed/no-dXip-rJM5',
      },
      {
        id: 'burpees-box-jump',
        name: 'BURPEES CON SALTO AL CAJÓN',
        image: '/img/crossfit/burpees_box_jump.jpg', // Nueva imagen
        gif: '/img/crossfit/burpees_box_jump.gif', // Nuevo GIF
        description: [
          'Una variante avanzada que añade un salto explosivo al cajón después del burpee estándar.',
          'Aumenta la potencia de las piernas y la demanda cardiovascular.',
        ],
        steps: [
          'Realiza un burpee estándar (sentadilla, plancha, flexión, salto hacia adelante).',
          'Al finalizar el salto, en lugar de un salto vertical normal, salta sobre un cajón.',
          'Baja del cajón con control y repite el burpee.',
        ],
        videoLink: 'https://www.youtube.com/embed/no-dXip-rJM6',
      },
    ],
  },
  // Agrega más ejercicios aquí si es necesario
];