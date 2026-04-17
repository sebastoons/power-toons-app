// src/data/foodPyramidData.js

export const foodGroups = {
  cereales: {
    name: 'Cereales e Hidratos de Carbono',
    description: 'Base de la pirámide alimenticia. Son la principal fuente de energía para el cuerpo. Se recomienda priorizar cereales integrales.',
    benefits: [
      'Proporcionan energía inmediata',
      'Ricos en fibra (versiones integrales)',
      'Fuentes de vitaminas del grupo B',
      'Mejoran la saciedad',
      'Estabilizan los niveles de glucosa'
    ],
    foods: [
      'Arroz integral',
      'Pan integral',
      'Pasta integral',
      'Avena',
      'Quinua',
      'Cebada',
      'Trigo',
      'Maíz',
      'Papa/batata',
      'Legumbres'
    ],
    macros: [
      { name: 'Carbohidratos', value: '70-80%' },
      { name: 'Fibra', value: '5-10g' },
      { name: 'Proteína', value: '8-12%' },
      { name: 'Grasas', value: '2-5%' }
    ],
    portion: '1 porción = 1 rebanada de pan, 1/2 taza de arroz cocido, 1 plato pequeño de pasta',
    tips: [
      'Elige opciones integrales siempre que sea posible',
      'Varía entre diferentes tipos de cereales',
      'Consume según tu nivel de actividad',
      'Aumenta fibra gradualmente',
      'Acompaña con proteína y verduras'
    ]
  },

  verduras: {
    name: 'Verduras',
    description: 'Ricas en vitaminas, minerales y fibra. Muy bajas en calorías. Se recomienda consumir variedad de colores.',
    benefits: [
      'Bajas en calorías, altas en nutrientes',
      'Ricas en vitaminas y minerales',
      'Excelentes fuentes de fibra',
      'Previenen enfermedades cardiovasculares',
      'Apoyan la digestión',
      'Mejoran la saciedad'
    ],
    foods: [
      'Espinaca',
      'Brócoli',
      'Zanahoria',
      'Tomate',
      'Lechuga',
      'Cebolla',
      'Ajo',
      'Pimiento',
      'Calabacín',
      'Coliflor',
      'Repollo',
      'Coles de Bruselas',
      'Remolacha',
      'Berenjena'
    ],
    macros: [
      { name: 'Carbohidratos', value: '5-15%' },
      { name: 'Fibra', value: '2-4g' },
      { name: 'Proteína', value: '2-4%' },
      { name: 'Grasas', value: '0-2%' }
    ],
    portion: '1 porción = 1 taza cruda o 1/2 taza cocida = puño de tu mano',
    tips: [
      'Come verduras crudas cuando sea posible',
      'Varía los colores: verde, rojo, naranja, morado',
      'Consume al menos 3-5 porciones diarias',
      'Las hojas verdes oscuras son especialmente nutritivas',
      'Cocina al vapor o a la plancha para retener nutrientes'
    ]
  },

  frutas: {
    name: 'Frutas',
    description: 'Excelentes fuentes de vitaminas, minerales y antioxidantes. Contienen azúcares naturales. Consume preferentemente enteras.',
    benefits: [
      'Ricas en vitamina C y antioxidantes',
      'Mejoran la inmunidad',
      'Protegen contra enfermedades crónicas',
      'Aportan fibra y saciedad',
      'Hidratan el cuerpo',
      'Mejoran la salud digestiva'
    ],
    foods: [
      'Manzana',
      'Plátano',
      'Naranja',
      'Limón',
      'Fresa',
      'Arándanos',
      'Sandía',
      'Melón',
      'Piña',
      'Papaya',
      'Mango',
      'Pera',
      'Uva',
      'Kiwi'
    ],
    macros: [
      { name: 'Carbohidratos', value: '12-18%' },
      { name: 'Fibra', value: '2-4g' },
      { name: 'Proteína', value: '0-2%' },
      { name: 'Grasas', value: '0-1%' }
    ],
    portion: '1 porción = 1 fruta mediana, 1 taza de frutas picadas = puño de tu mano',
    tips: [
      'Consume frutas enteras, no solo jugos',
      'Come la cáscara cuando sea posible (fibra)',
      'Varía los tipos de frutas',
      'Limita frutas secas (más concentradas en azúcar)',
      'Mejor consumir antes del entrenamiento'
    ]
  },

  proteinas: {
    name: 'Proteínas',
    description: 'Esenciales para construcción y reparación muscular. Incluye carnes, pescados, huevos y legumbres.',
    benefits: [
      'Construyen y reparan músculos',
      'Crean hormonas y enzimas',
      'Mantienen la saciedad más tiempo',
      'Elevan el metabolismo',
      'Estabilizan el azúcar en sangre',
      'Fortalecen huesos y inmunidad'
    ],
    foods: [
      'Pollo',
      'Pavo',
      'Carne magra',
      'Salmón',
      'Tilapia',
      'Atún',
      'Huevos',
      'Lentejas',
      'Garbanzos',
      'Frijoles',
      'Tofu',
      'Tempeh',
      'Queso descremado',
      'Yogur griego'
    ],
    macros: [
      { name: 'Proteína', value: '25-35%' },
      { name: 'Grasas', value: '5-15%' },
      { name: 'Carbohidratos', value: '0-5%' },
      { name: 'Calorías', value: '150-200 kcal' }
    ],
    portion: '1 porción = 100-120g de carne, 2-3 huevos, 1 taza de legumbres cocidas',
    tips: [
      'Elige cortes magros',
      'Come pescado 2-3 veces por semana',
      'Incluye legumbres en tu dieta',
      'Combina proteína con verduras',
      'Ideal post-entrenamiento'
    ]
  },

  lacteos: {
    name: 'Lácteos',
    description: 'Fuentes de calcio para huesos y dientes. Preferentemente versiones bajas en grasa.',
    benefits: [
      'Ricos en calcio para huesos fuertes',
      'Contienen proteína de calidad',
      'Aportan vitamina D',
      'Mejoran la salud dental',
      'Ayudan a la saciedad',
      'Tienen probióticos (yogur)'
    ],
    foods: [
      'Leche descremada',
      'Leche semidesnatada',
      'Yogur natural',
      'Yogur griego',
      'Queso fresco',
      'Queso bajo en grasa',
      'Ricota',
      'Requesón',
      'Kéfir',
      'Leche de almendras enriquecida'
    ],
    macros: [
      { name: 'Proteína', value: '3-10%' },
      { name: 'Calcio', value: '300mg' },
      { name: 'Grasas', value: '0-2%' },
      { name: 'Carbohidratos', value: '5%' }
    ],
    portion: '1 porción = 1 taza de leche (240ml), 1 yogur (150g), 30g de queso',
    tips: [
      'Elige opciones bajas en grasa',
      'Lee las etiquetas de azúcar añadido',
      'Yogur natural es mejor que endulzado',
      'Combina con frutas para mayor nutrición',
      'Si eres intolerante, usa alternativas enriquecidas'
    ]
  },

  aceites: {
    name: 'Aceites y Grasas',
    description: 'Esenciales en pequeñas cantidades. Prioriza grasas insaturadas saludables.',
    benefits: [
      'Necesarias para absorber vitaminas liposolubles',
      'Protegen el corazón (grasas insaturadas)',
      'Reducen inflamación',
      'Mejoran la salud del cerebro',
      'Regulan hormonas',
      'Aportan saciedad'
    ],
    foods: [
      'Aceite de oliva',
      'Aceite de aguacate',
      'Aceite de coco',
      'Aguacate',
      'Frutos secos (almendras, nueces)',
      'Semillas (girasol, sésamo, chía)',
      'Mantequilla de maní natural',
      'Huevos',
      'Pescados grasos',
      'Mantequilla (moderadamente)'
    ],
    macros: [
      { name: 'Grasas', value: '100%' },
      { name: 'Calorías', value: '120 kcal/cucharada' },
      { name: 'Grasas insaturadas', value: '70-80%' },
      { name: 'Grasas saturadas', value: '10-15%' }
    ],
    portion: '1 porción = 1 cucharada de aceite, 1/4 de aguacate, puñado de frutos secos',
    tips: [
      'Usa porciones pequeñas',
      'Aceite de oliva virgen es el mejor',
      'Cocina a temperaturas moderadas',
      'Almacena en lugar fresco y oscuro',
      'Prioriza grasas insaturadas sobre saturadas'
    ]
  }
};