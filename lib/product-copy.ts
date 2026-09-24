export type ProductArticle = {
  headline: string;
  subhead: string;
  intro: string;
  bullets: string[];
  when: string;
  faq: { q: string; a: string }[];
};

export const PRODUCT_ARTICLES: Record<string, ProductArticle> = {
  recover: {
    headline: "Recovery Mix",
    subhead: "Carbohidratos + proteína",
    intro:
      "Mezcla post-entrenamiento con proporción 3:2 de carbohidratos y proteína para reponer glucógeno y reparar fibra muscular. Se disuelve limpio.",
    bullets: [
      "20 g de proteína de suero por porción",
      "30 g de carbohidratos para reponer glucógeno",
      "Perfil completo de 18 aminoácidos",
      "16 vitaminas y minerales",
    ],
    when: "Tómalo en la primera hora después de correr o de una sesión intensa; ahí es cuando más ayuda a reponer glucógeno y volver con mejor base.",
    faq: [
      {
        q: "¿Cuándo debo tomar Recovery Mix?",
        a: "Después de tu entrenamiento o carrera, en la primera hora. Es el momento en el que más ayuda a reponer glucógeno y apoyar la recuperación muscular.",
      },
      {
        q: "¿Se puede tomar todos los días?",
        a: "Sí, siempre que se use como parte de una dieta equilibrada y no excedas la porción recomendada. Es una herramienta para recuperación y rendimiento.",
      },
      {
        q: "¿Tiene azúcar añadido?",
        a: "No. Recovery Mix tiene 0 g de azúcar añadido y se formula para que se disuelva limpio, sin texturas raras ni sabores cargados.",
      },
      {
        q: "¿Puedo mezclarlo con agua y hielo?",
        a: "Sí. Se disuelve bien con agua fría o tibia; también puedes mezclarlo con hielo para un perfil más refrescante.",
      },
    ],
  },
  endure: {
    headline: "Creatina",
    subhead: "Fuerza y potencia",
    intro:
      "Creatina monohidratada pura: el suplemento más estudiado para fuerza, potencia y resistencia muscular. 5 g por porción, sin rellenos. Para entrenar más fuerte y recuperarte mejor.",
    bullets: [
      "5 g de creatina monohidratada por porción",
      "Aumenta fuerza, potencia y resistencia muscular",
      "Mejora la recuperación entre series",
      "99.9% de pureza sin rellenos ni aditivos",
    ],
    when: "Tómala en el entrenamiento o después de la sesión, siguiendo la dosis diaria recomendada para mantener tus depósitos de fosfocreatina más altos.",
    faq: [
      {
        q: "¿Cuándo es mejor tomar la creatina?",
        a: "Puedes tomarla en cualquier momento del día; muchos atletas la usan después del entrenamiento o con su desayuno para mantener consistencia.",
      },
      {
        q: "¿Necesito hacer una fase de cargado?",
        a: "No hace falta. La forma más simple y efectiva es tomar 5 g diarios. La consistencia aporta resultados más estables.",
      },
      {
        q: "¿Puede causar retención de agua?",
        a: "Un poco de retención de agua intracelular es normal y suele ser parte del proceso de mejora de la fuerza y la potencia.",
      },
      {
        q: "¿Es segura para uso continuo?",
        a: "Sí, la creatina monohidratada es una de las formas mejor estudiadas y ampliamente usadas en rendimiento deportivo.",
      },
    ],
  },
  hydrate: {
    headline: "Electrolitos",
    subhead: "Hidratación · Todo el día",
    intro:
      "Hidratación inteligente que se siente viva. Sodio, potasio y magnesio con cítricos naturales — ligera, fresca y sin azúcar, para entrenar y para vivir.",
    bullets: [
      "1000 mg de sodio para reponer lo que sudas",
      "Potasio y magnesio para apoyo de hidratación y contracción muscular",
      "Cero azúcar · endulzado con estevia",
      "Ácido cítrico y málico para un sabor fresco",
    ],
    when: "Tómalo al despertar o 30 minutos antes de entrenar; también sirve en días de calor, viajes o cuando aumente la sudoración.",
    faq: [
      {
        q: "¿Cuándo debo tomar electrolitos?",
        a: "Si entrenas fuerte, sudas mucho o pasas varias horas al sol, puedes tomar electrolitos antes o durante la actividad y también al terminar.",
      },
      {
        q: "¿Es mejor que una bebida deportiva?",
        a: "Tiene un enfoque más preciso: sodio, potasio y magnesio para hidratarte de forma inteligente y sin cargar el cuerpo con azúcar.",
      },
      {
        q: "¿Viene con sabor fuerte?",
        a: "No. Está formulado para ser ligero, fresca y fácil de tomar, con cítricos naturales y un perfil limpio.",
      },
      {
        q: "¿Lo puedo tomar fuera del entrenamiento?",
        a: "Sí. También es útil en días calurosos, viajes largos o cuando tu rutina diaria te exige más hidratación.",
      },
    ],
  },
};

export const SCIENCE_REFERENCES = [
  {
    label: "Glucógeno y recuperación",
    href: "#referencias",
  },
  {
    label: "Síntesis proteica",
    href: "#referencias",
  },
  {
    label: "Ventana de absorción 30 min",
    href: "#referencias",
  },
];
