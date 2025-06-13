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
    image: '/img/cross/9.png',
    gif: '/img/cross/burpees.gif',
    description: [
      'Los burpees consisten en un ejercicio con movimientos compuestos, lo que significa que al realizarlos se activan diversos grupos musculares.',
      'Los pectorales, tríceps, hombros, cuádriceps, femorales, gemelos, abdominales y glúteos son los grandes beneficiados con este ejercicio.',
    ],
    steps: [
      'La posición de inicio es en vertical con los pies a la altura de los hombro, a continuación haz una sentadilla hasta tocar el suelo con tus manos.',
      'Sin despegar las manos del suelo, impulsa ambas piernas a la vez hasta quedarte en posición de plancha, después pasarás a realizar una flexión de pecho.',
      'Al Realizar la flexión de pecho, haz el movimiento contrario al paso 2, impulsa ambas piernas acercando tus rodillas al pecho. Ya sólo te queda realizar el salto, salta tan alto como puedas y acaba en la posición inicial.',
      'Si quieres aunmentar la dificultad más, al saltar, eleva tus rodillas al pecho.',
    ],
    videoLink: 'https://www.youtube.com/embed/auBLPXO8Fww',
    // --- NUEVO: Variantes para BURPEES ---
    variants: [
      {
        id: 'hspu',
        name: 'HANDSTAND PUSH UP',
        image: '/img/cross/hspu.jpg', // Nueva imagen
        gif: '/img/cross/hspug.gif', // Nuevo GIF
        description: [
          'El Handstand Push Up es un ejercicio que no puede ser olvidado en el área del CrossFit y es clave para trabajar la fuerza y la resistencia muscular.',
          'Los atletas de este área suelen trabajar en mejorar su técnica de flexiones verticales para poder realizar un gran número de repeticiones sin cansarse rápidamente.',
        ],
        steps: [
          'El Handstand Push Up es un ejercicio que no puede ser olvidado en el área del CrossFit y es clave para trabajar la fuerza y la resistencia muscular.',
          'Después, deberás impulsar tu cuerpo para hacer el pino y soportar todo el peso sobre tus brazos. Puedes ayudarte de una pared para colocarte en la posición inicial, apoyándote en ella hasta conseguir el equilibrio.',
          'Una vez consigas dominar el equilibrio de tu cuerpo, se realiza una flexión de los brazos manteniendo los codos hacia dentro. ',
          'Al realizar el paso anterior, debes llevar tu cuerpo suavemente hacia delante. Así, podrás mantener tu cuerpo equilibrado.',
          'Por último, comienza a estirar los brazos, manteniendo la posición de los codos hacia adentro,  con el abdomen apretado, empuja hacia arriba.',
        ],
        videoLink: 'https://www.youtube.com/embed/XmcgQYfcXZc',
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
  {
    id: 'hspu',
        name: 'HANDSTAND PUSH UP',
        image: '/img/cross/hspup.png', // Nueva imagen
        gif: '/img/cross/hspug.gif', // Nuevo GIF
        description: [
          'El Handstand Push Up es un ejercicio que no puede ser olvidado en el área del CrossFit y es clave para trabajar la fuerza y la resistencia muscular.',
          'Los atletas de este área suelen trabajar en mejorar su técnica de flexiones verticales para poder realizar un gran número de repeticiones sin cansarse rápidamente.',
        ],
        steps: [
          'El Handstand Push Up es un ejercicio que no puede ser olvidado en el área del CrossFit y es clave para trabajar la fuerza y la resistencia muscular.',
          'Después, deberás impulsar tu cuerpo para hacer el pino y soportar todo el peso sobre tus brazos. Puedes ayudarte de una pared para colocarte en la posición inicial, apoyándote en ella hasta conseguir el equilibrio.',
          'Una vez consigas dominar el equilibrio de tu cuerpo, se realiza una flexión de los brazos manteniendo los codos hacia dentro. ',
          'Al realizar el paso anterior, debes llevar tu cuerpo suavemente hacia delante. Así, podrás mantener tu cuerpo equilibrado.',
          'Por último, comienza a estirar los brazos, manteniendo la posición de los codos hacia adentro,  con el abdomen apretado, empuja hacia arriba.',
        ],
        videoLink: 'https://www.youtube.com/embed/XmcgQYfcXZc',
  },
  // Agrega más ejercicios aquí si es necesario
];