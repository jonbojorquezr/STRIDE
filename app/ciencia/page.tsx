import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "La Ciencia de la Recuperación | Stride",
  description:
    "Qué dice la evidencia sobre proteína, carbohidratos, electrolitos y creatina para atletas de resistencia. Con referencias.",
  openGraph: {
    title: "La Ciencia de la Recuperación | Stride",
    description:
      "Qué dice la evidencia sobre proteína, carbohidratos, electrolitos y creatina para atletas de resistencia. Con referencias.",
    siteName: "Stride",
    locale: "es_MX",
    type: "article",
    images: ["/img/recovery-front.png"],
  },
};

const cellStyle = { padding: 18, borderBottom: "1px solid var(--line-2)" };
const headStyle = { textAlign: "left" as const, padding: 18, borderBottom: "1px solid var(--line)" };

function Question({ children }: { children: React.ReactNode }) {
  return <h3 className="display h-sm" style={{ marginTop: 34 }}>{children}</h3>;
}

function ScienceTable({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflowX: "auto", marginTop: 24 }}>
      <table style={{ width: "100%", minWidth: 640, borderCollapse: "collapse", background: "var(--paper)", border: "1px solid var(--line)" }}>
        {children}
      </table>
    </div>
  );
}

export default function CienciaPage() {
  return (
    <>
      <Nav />
      <main className="science-page">
        <section className="section science dark" style={{ paddingTop: 120 }}>
          <div className="wrap">
            <p className="eyebrow">La ciencia, simple</p>
            <h1 className="display h-xl" style={{ marginTop: 12 }}>La Ciencia de la Recuperación</h1>
            <p className="lede" style={{ maxWidth: 900, marginTop: 18 }}>
              Qué dice la evidencia sobre proteína, carbohidratos, electrolitos y creatina para atletas de resistencia.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="display h-lg">Tres productos, tres escalas de tiempo</h2>
            <p className="lede" style={{ maxWidth: 900, marginTop: 18 }}>
              La confusión más común en suplementación deportiva es tratar todos los productos como si actuaran igual. No lo hacen. Operan en escalas de tiempo distintas, y por eso se complementan en lugar de competir.
            </p>
            <ScienceTable>
              <thead>
                <tr>
                  <th style={headStyle}>Producto</th>
                  <th style={headStyle}>Escala de tiempo</th>
                  <th style={headStyle}>Qué resuelve</th>
                  <th style={headStyle}>Cuándo</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={cellStyle}>Hydrate</td><td style={cellStyle}>Minutos a horas</td><td style={cellStyle}>Balance de líquido y sodio</td><td style={cellStyle}>Al despertar, antes de entrenar</td></tr>
                <tr><td style={cellStyle}>Recovery Mix</td><td style={cellStyle}>0 a 2 horas post ejercicio</td><td style={cellStyle}>Glucógeno y reparación muscular</td><td style={cellStyle}>Después de la sesión</td></tr>
                <tr><td style={cellStyle}>Creatina</td><td style={cellStyle}>Semanas</td><td style={cellStyle}>Saturación de fosfocreatina muscular</td><td style={cellStyle}>Todos los días, sin horario</td></tr>
              </tbody>
            </ScienceTable>
            <p className="lede" style={{ maxWidth: 900, marginTop: 24 }}>
              Hydrate es hidratación aguda. Recovery Mix es recuperación aguda. Creatina es recuperación acumulada. Ninguno sustituye a otro porque ninguno hace lo mismo.
            </p>
          </div>
        </section>

        <section className="section science dark">
          <div className="wrap">
            <h2 className="display h-lg">La ciencia de la recuperación post entrenamiento</h2>
            <Question>¿Cuánto carbohidrato necesitas realmente después de entrenar?</Question>
            <p className="lede">La literatura es clara en el número: para maximizar la resíntesis de glucógeno muscular en las horas posteriores al ejercicio, se requieren al menos 1.2 g de carbohidrato por kilo de peso por hora (1). Para un corredor de 70 kg eso son 84 g de carbohidrato en la primera hora. Recovery Mix aporta 30 g.</p>
            <p className="lede" style={{ marginTop: 16 }}>Esa diferencia no es un defecto, es una decisión, y vale la pena explicarla en lugar de esconderla.</p>
            <Question>¿Entonces para qué sirve agregar proteína?</Question>
            <p className="lede">Aquí está el punto interesante. La evidencia muestra que agregar proteína al carbohidrato acelera la recuperación de glucógeno precisamente cuando la ingesta de carbohidrato es subóptima, por debajo de 0.8 g/kg/h (2). Cuando ya estás consumiendo 1.2 g/kg/h o más, la proteína no aporta glucógeno adicional (1).</p>
            <p className="lede" style={{ marginTop: 16 }}>Dicho de otra forma: un producto de 3:2 como Recovery Mix está diseñado para el escenario donde la proteína sí suma. Si tu plan es tomarte un batido y luego comer normal, este es el perfil correcto. Si vas a hacer una segunda sesión en cuatro horas y necesitas saturación total de glucógeno, necesitas más carbohidrato del que cualquier batido te va a dar, y eso viene de comida.</p>
            <Question>¿Por qué 2.2 g de leucina importa?</Question>
            <p className="lede">La leucina es el aminoácido que dispara la señal de síntesis de proteína muscular. El umbral relevante está en el rango de 2 a 3 g por toma. Recovery Mix aporta 2.2 g de leucina dentro de sus 4.6 g de BCAA totales, que es donde la señal se activa.</p>
            <Question>¿Qué hace el Cluster Dextrin diferente?</Question>
            <p className="lede">El Cluster Dextrin es una dextrina cíclica altamente ramificada, con peso molecular cercano a 400,000 g/mol frente a 180 g/mol de la glucosa. Esa estructura produce una osmolalidad extremadamente baja, alrededor de 9 mOsm, contra 646 mOsm de una solución de glucosa al 10% (3).</p>
            <p className="lede" style={{ marginTop: 16 }}>La osmolalidad determina qué tan rápido sale un líquido del estómago. En un estudio de vaciamiento gástrico, una solución de Cluster Dextrin al 10% salió del estómago en 26.7 minutos frente a 39.9 minutos de una solución de glucosa equivalente (4).</p>
            <p className="lede" style={{ marginTop: 16 }}>Para un corredor que acaba de cruzar la meta con el estómago cerrado, esa diferencia es la que determina si puedes tomarte tu recuperación de inmediato o tienes que esperar.</p>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="display h-lg">La ciencia de los electrolitos</h2>
            <Question>¿Cuánto sodio pierdes realmente?</Question>
            <p className="lede">Mucho más de lo que la mayoría supone, y con una variabilidad enorme entre personas. El rango documentado va de 200 a 2,000 mg de sodio por litro de sudor (5). Un análisis de 506 atletas ubicó el promedio de concentración de sodio en sudor en torno a 826 mg/L (6).</p>
            <p className="lede" style={{ marginTop: 16 }}>La tasa de sudoración también varía muchísimo: entre 0.5 y 2.5 L por hora en atletas de resistencia, con valores que comúnmente superan 1 L/h (7).</p>
            <ScienceTable>
              <thead><tr><th style={headStyle}>Perfil</th><th style={headStyle}>Sodio en sudor</th><th style={headStyle}>Pérdida en 1 h a 1 L/h</th></tr></thead>
              <tbody>
                <tr><td style={cellStyle}>Bajo</td><td style={cellStyle}>~460 mg/L</td><td style={cellStyle}>~460 mg</td></tr>
                <tr><td style={cellStyle}>Promedio</td><td style={cellStyle}>~826 mg/L</td><td style={cellStyle}>~826 mg</td></tr>
                <tr><td style={cellStyle}>Alto</td><td style={cellStyle}>~1,840 mg/L</td><td style={cellStyle}>~1,840 mg</td></tr>
              </tbody>
            </ScienceTable>
            <p className="lede" style={{ marginTop: 24 }}>Una porción de Hydrate aporta 500 mg de sodio. Para un perfil promedio eso cubre cerca del 60% de la pérdida de una hora de sudor intenso. Para alguien en el extremo alto, cubre poco más de un cuarto. Por eso la recomendación no es una porción para todos, sino ajustar según cuánto y qué tan salado sudas.</p>
            <Question>¿Por qué varía tanto entre personas?</Question>
            <p className="lede">Principalmente por genética. La concentración de sodio en el sudor es una característica individual que el entrenamiento y la aclimatación al calor modifican solo de forma moderada. Un estudio con 157 maratonistas encontró concentraciones que iban de 7.0 a 95.5 mmol/L dentro del mismo grupo, corriendo la misma carrera en las mismas condiciones (8).</p>
            <p className="lede" style={{ marginTop: 16 }}>Esto tiene una implicación práctica incómoda para la industria: ninguna dosis única sirve igual para todos, y cualquier marca que te diga lo contrario te está vendiendo una simplificación.</p>
            <Question>¿Qué pasa si solo tomas agua?</Question>
            <p className="lede">En esfuerzos prolongados, reponer solo agua diluye el sodio en sangre. La hiponatremia, definida como sodio sérico por debajo de 135 mmol/L, tiene una prevalencia reportada de hasta 13% en corredores de maratón (8). No es un fenómeno raro de casos extremos.</p>
            <Question>¿Por qué Hydrate no lleva carbohidratos?</Question>
            <p className="lede">Porque separamos las funciones. El sodio acompañado de carbohidrato mejora la absorción de líquido, y por eso las bebidas deportivas tradicionales los combinan. Pero eso las convierte en producto de consumo durante el esfuerzo, y en producto con azúcar el resto del tiempo. Hydrate está pensado para hidratación basal y previa: llenar el bidón en la mañana, llegar hidratado al entrenamiento. La energía la aportas por otro lado.</p>
          </div>
        </section>

        <section className="section science dark">
          <div className="wrap">
            <h2 className="display h-lg">La ciencia de la creatina</h2>
            <Question>¿Qué tan sólida es la evidencia?</Question>
            <p className="lede">Es probablemente la más sólida de cualquier suplemento deportivo. La posición oficial de la International Society of Sports Nutrition, revisada por Kreider y colaboradores, concluye que la creatina monohidratada es el suplemento nutricional ergogénico más efectivo disponible para aumentar la capacidad de ejercicio de alta intensidad y la masa magra durante el entrenamiento (9).</p>
            <Question>¿Cómo funciona?</Question>
            <p className="lede">Por saturación acumulada, no por efecto agudo. La creatina se almacena en el músculo como fosfocreatina, que es el sistema de reposición rápida de ATP. Por eso no tiene sentido preguntarse a qué hora tomarla: lo que importa es mantener el depósito lleno, y eso se logra con consistencia diaria durante semanas.</p>
            <p className="lede" style={{ marginTop: 16 }}>Esta es la diferencia conceptual con los otros dos productos. Hydrate y Recovery Mix resuelven un momento. La creatina resuelve un estado.</p>
            <Question>¿Qué le da a un atleta de resistencia?</Question>
            <p className="lede">No velocidad en el maratón. Lo que la evidencia respalda es la capacidad de tolerar cargas altas de entrenamiento, el trabajo de fuerza y de alta intensidad, y un rol en la prevención y reducción de severidad de lesiones y en la rehabilitación (9).</p>
            <p className="lede" style={{ marginTop: 16 }}>Para un corredor que compite, el valor está en las series, las cuestas, el gimnasio y la recuperación entre sesiones a lo largo de un bloque de entrenamiento. Es infraestructura, no combustible.</p>
            <Question>¿Los mitos de deshidratación y calambres?</Question>
            <p className="lede">El consenso del ISSN es explícito: las afirmaciones de que la creatina causa deshidratación y calambres no están respaldadas por evidencia científica, y la investigación sugiere que puede mejorar el estado de hidratación y reducir la incidencia de calambres (9).</p>
            <Question>¿Seguridad?</Question>
            <p className="lede">El cuerpo de evidencia revisado incluye uso de hasta 30 g diarios durante cinco años en individuos sanos, con buena tolerancia y sin efectos adversos reportados, en poblaciones que van desde infantes hasta adultos mayores (9). La dosis de mantenimiento estándar es 3 a 5 g diarios.</p>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="display h-lg">Cómo se combinan</h2>
            <Question>El día normal de entrenamiento</Question>
            <p className="lede">Hydrate al despertar, para llegar a la sesión hidratado en lugar de reaccionar a la sed. Creatina en cualquier momento del día, por consistencia. Recovery Mix dentro de la hora siguiente a la sesión.</p>
            <Question>El bloque de preparación</Question>
            <p className="lede">Durante las semanas de carga, la creatina es la que más trabaja: te permite sostener volumen e intensidad sin que la recuperación entre sesiones se vuelva el cuello de botella. Recovery Mix cubre cada sesión individual. Hydrate mantiene el balance de líquidos día con día, que es donde se acumulan los déficits que nadie nota.</p>
            <Question>El día de carrera</Question>
            <p className="lede">Hydrate antes de salir. Recovery Mix al cruzar la meta. La creatina ese día no hace nada distinto de lo que ya hizo durante las semanas previas, que es exactamente el punto.</p>
            <Question>Lo que ninguno de los tres hace</Question>
            <p className="lede">No reemplazan comida, no compensan un plan de entrenamiento mal estructurado y no previenen lesiones por sí solos. Un suplemento resuelve un margen. El margen importa cuando ya hiciste bien lo grande.</p>
          </div>
        </section>

        <section className="section" id="referencias">
          <div className="wrap">
            <h2 className="display h-lg">Referencias</h2>
            <ol style={{ marginTop: 24, paddingLeft: 24, display: "grid", gap: 14 }}>
              <li>Jentjens R, Jeukendrup AE. Determinants of post-exercise glycogen synthesis during short-term recovery. <em>Sports Medicine</em>. 2003;33(2):117-144.</li>
              <li>Alghannam AF, Gonzalez JT, Betts JA. Restoration of muscle glycogen and functional capacity: role of post-exercise carbohydrate and protein co-ingestion. <em>Nutrients</em>. 2018;10(2):253.</li>
              <li>Takata H, et al. Structure and properties of highly branched cyclic dextrin. Revisado en: Highly branched cyclic dextrin and its ergogenic effects in athletes: a brief review. <em>Journal of Exercise and Nutrition</em>. 2021.</li>
              <li>Takii H, Takii Nagao Y, Kometani T, Nishimura T, Nakae T, Kuriki T, Fushiki T. Fluids containing a highly branched cyclic dextrin influence the gastric emptying rate. <em>International Journal of Sports Medicine</em>. 2005;26(4):314-319.</li>
              <li>Baker LB. Sweat testing methodology in the field: challenges and best practices. <em>Gatorade Sports Science Institute, Sports Science Exchange</em>. 2025.</li>
              <li>Análisis retrospectivo de 506 atletas en múltiples disciplinas y condiciones ambientales, citado en la literatura de variabilidad de sodio en sudor.</li>
              <li>Barnes KA, et al. Normative data for sweating rate, sweat sodium concentration, and sweat sodium loss in athletes: an update and analysis by sport. <em>Journal of Sports Sciences</em>. 2019.</li>
              <li>Del Coso J, et al. Interindividual variability in sweat electrolyte concentration in marathoners. <em>Journal of the International Society of Sports Nutrition</em>. 2016;13:31.</li>
              <li>Kreider RB, Kalman DS, Antonio J, Ziegenfuss TN, Wildman R, Collins R, Candow DG, Kleiner SM, Almada AL, Lopez HL. International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine. <em>Journal of the International Society of Sports Nutrition</em>. 2017;14:18.</li>
            </ol>
          </div>
        </section>

        <div className="wrap" style={{ paddingBottom: 72 }}>
          <Link href="/" className="btn btn-primary">Volver a Stride <span className="arrow">→</span></Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
