import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ciencia Stride — Recovery Mix, Creatina y Electrolitos",
  description:
    "La ciencia detrás de Recovery Mix, Creatina y Electrolitos: proporción 3:2, recuperación, fuerza y hidratación inteligente.",
  openGraph: {
    title: "Ciencia Stride",
    description:
      "La ciencia detrás de Recovery Mix, Creatina y Electrolitos: proporción 3:2, recuperación, fuerza y hidratación inteligente.",
    siteName: "Stride",
    locale: "es_MX",
    type: "website",
    images: ["/img/recovery-front.png"],
  },
};

export default function CienciaPage() {
  return (
    <main className="science-page">
      <section className="section science dark" style={{ paddingTop: 120 }}>
        <div className="wrap">
          <p className="eyebrow reveal">La ciencia, simple</p>
          <h1 className="display h-xl reveal" style={{ marginTop: 12 }}>Por qué funciona</h1>
          <p className="lede reveal" style={{ maxWidth: 900, marginTop: 16 }}>
            La proporción 3:2 de carbohidratos y proteína en Recovery Mix, la creatina con evidencia sólida y la hidratación con sodio, potasio y magnesio estan pensadas para entrenar mejor, recuperar más rápido y rendir con consistencia.
          </p>

          <div className="sci-head" style={{ marginTop: 42 }}>
            <div className="sci-copy">
              <h2 className="display h-lg">El 3:2</h2>
              <div className="ratio-viz reveal" style={{ marginTop: 20 }}>
                <div className="ratio-bar">
                  <span className="ratio-c" style={{ flex: 3 }}>Carbohidratos</span>
                  <span className="ratio-p" style={{ flex: 2 }}>Proteína</span>
                </div>
                <div className="ratio-keys mono">
                  <span>3 partes carbo</span>
                  <span>2 partes proteína</span>
                </div>
              </div>
            </div>
            <div>
              <p className="lede">
                La combinación de carbohidratos y proteína no es casual: ayuda a reponer glucógeno y a sincronizar la síntesis proteica justo cuando el cuerpo lo necesita después de un esfuerzo.
              </p>
            </div>
          </div>

          <div className="sci-grid" style={{ marginTop: 32 }}>
            <article className="sci-card reveal">
              <span className="sci-n mono">01</span>
              <h3>Repón el glucógeno</h3>
              <p className="lede">Los carbohidratos de absorción rápida rellenan tus reservas de energía antes del próximo entrenamiento.</p>
            </article>
            <article className="sci-card reveal">
              <span className="sci-n mono">02</span>
              <h3>Repara la fibra</h3>
              <p className="lede">La proteína entrega los aminoácidos que reconstruyen el músculo — más fuerte que antes.</p>
            </article>
            <article className="sci-card reveal">
              <span className="sci-n mono">03</span>
              <h3>La ventana de 30 min</h3>
              <p className="lede">Tu cuerpo absorbe nutrientes como esponja justo después de correr. Stride está hecho para ese momento.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="display h-lg">La ciencia detrás de cada fórmula</h2>

          <div style={{ overflowX: "auto", marginTop: 28 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--paper)", border: "1px solid var(--line)" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: 18, borderBottom: "1px solid var(--line)" }}>Fórmula</th>
                  <th style={{ textAlign: "left", padding: 18, borderBottom: "1px solid var(--line)" }}>Qué hace</th>
                  <th style={{ textAlign: "left", padding: 18, borderBottom: "1px solid var(--line)" }}>Cuándo ayuda más</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: 18, borderBottom: "1px solid var(--line-2)" }}>Recovery Mix</td>
                  <td style={{ padding: 18, borderBottom: "1px solid var(--line-2)" }}>Repones glucógeno y reparas músculo con una proporción 3:2.</td>
                  <td style={{ padding: 18, borderBottom: "1px solid var(--line-2)" }}>Después del entrenamiento o la carrera.</td>
                </tr>
                <tr>
                  <td style={{ padding: 18, borderBottom: "1px solid var(--line-2)" }}>Creatina</td>
                  <td style={{ padding: 18, borderBottom: "1px solid var(--line-2)" }}>Aumenta la disponibilidad de fosfocreatina para fuerza y potencia.</td>
                  <td style={{ padding: 18, borderBottom: "1px solid var(--line-2)" }}>En días de fuerza, velocidad y trabajo intenso.</td>
                </tr>
                <tr>
                  <td style={{ padding: 18 }}>Electrolitos</td>
                  <td style={{ padding: 18 }}>Reponen sodio, potasio y magnesio para mantener la hidratación.</td>
                  <td style={{ padding: 18 }}>Durante entrenamiento largo, calor o actividad prolongada.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" id="referencias">
        <div className="wrap">
          <h2 className="display h-md">Referencias</h2>
          <div style={{ display: "grid", gap: 14, marginTop: 22 }}>
            <a href="#" style={{ color: "var(--teal)" }}>1. Burke, L.M. et al. Carbohydrates for training and competition.</a>
            <a href="#" style={{ color: "var(--teal)" }}>2. Jäger, R. et al. International Society of Sports Nutrition Position Stand: protein and exercise.</a>
            <a href="#" style={{ color: "var(--teal)" }}>3. Kreider, R.B. et al. ISSN exercise & sport nutrition review update.</a>
            <a href="#" style={{ color: "var(--teal)" }}>4. Maughan, R.J. et al. Hydration and performance.</a>
          </div>
        </div>
      </section>
    </main>
  );
}
